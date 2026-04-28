// src/hooks/useWishlist.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import wishlistService from "@/services/wishlist.service";
import { ToasterContext } from "@/contexts/ToasterContext";
import { useContext } from "react";
import { useSession } from "next-auth/react";

export interface WishlistProduct {
  id: string;
  name: string;
  recommended_retail_price: number;
}

export interface WishlistItem {
  id: string;
  product_id: string;
  image: string;
  name: string;
  inStock: boolean;
  product: WishlistProduct;
}

export interface WishlistData {
  data: WishlistItem[];
  count: number;
}

export const useWishlist = () => {
  const { setToaster } = useContext(ToasterContext);
  const queryClient = useQueryClient();
  const { status } = useSession();

  const {
    data: wishlistData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const response = await wishlistService.getWishlist();
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    enabled: status === "authenticated",
  });

  const addMutation = useMutation({
    mutationFn: (productId: string) => wishlistService.postWishlist(productId),
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: ["wishlist"] });

      const previousWishlist = queryClient.getQueryData(["wishlist"]);

      queryClient.setQueryData(["wishlist"], (old: WishlistData) => ({
        ...old,
        data: [...(old?.data || []), { product_id: productId }],
      }));

      return { previousWishlist };
    },
    onError: (_err, _productId, context) => {
      queryClient.setQueryData(["wishlist"], context?.previousWishlist);
      setToaster({
        type: "error",
        message: "Failed to add to wishlist",
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Added to wishlist",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (productId: string) =>
      wishlistService.deleteWishlist(productId),
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: ["wishlist"] });

      const previousWishlist = queryClient.getQueryData(["wishlist"]);

      queryClient.setQueryData(["wishlist"], (old: WishlistData) => ({
        ...old,
        data:
          old?.data?.filter(
            (item: WishlistItem) => String(item.product_id) !== productId,
          ) || [],
      }));

      return { previousWishlist };
    },
    onError: (_err, _productId, context) => {
      queryClient.setQueryData(["wishlist"], context?.previousWishlist);
      setToaster({
        type: "error",
        message: "Failed to remove from wishlist",
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Removed from wishlist",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });

  return {
    wishlistItems: wishlistData?.data || [],
    wishlistCount: wishlistData?.count,
    isLoading,
    error,
    addToWishlist: addMutation.mutate,
    removeFromWishlist: removeMutation.mutate,
    isAddingToWishlist: addMutation.isPending,
    isRemovingFromWishlist: removeMutation.isPending,
  };
};

export const useIsInWishlist = (productId: string) => {
  const { wishlistItems } = useWishlist();
  return wishlistItems.some(
    (item: WishlistItem) => String(item.product_id) === productId,
  );
};