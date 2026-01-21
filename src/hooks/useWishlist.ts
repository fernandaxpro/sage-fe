/* eslint-disable @typescript-eslint/no-explicit-any */
// src/hooks/useWishlist.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import wishlistService from "@/services/wishlist.service";
import { ToasterContext } from "@/contexts/ToasterContext";
import { useContext } from "react";

export const useWishlist = () => {
  const { setToaster } = useContext(ToasterContext);
  const queryClient = useQueryClient();

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
  });

  const addMutation = useMutation({
    mutationFn: (productId: string) => wishlistService.postWishlist(productId),
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: ["wishlist"] });

      const previousWishlist = queryClient.getQueryData(["wishlist"]);

      queryClient.setQueryData(["wishlist"], (old: any) => ({
        ...old,
        data: [...(old?.data || []), { product_id: productId }],
      }));

      return { previousWishlist };
    },
    onError: (err, productId, context) => {
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

      queryClient.setQueryData(["wishlist"], (old: any) => ({
        ...old,
        data:
          old?.data?.filter(
            (item: any) => String(item.product_id) !== productId,
          ) || [],
      }));

      return { previousWishlist };
    },
    onError: (err, productId, context) => {
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
    (item: any) => String(item.product_id) === productId,
  );
};
