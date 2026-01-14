import productService from "@/services/product.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const useProductDetail = () => {
  const params = useParams();
  const productSlug = params?.id as string;

  const getProductById = async () => {
    if (!productSlug) return null;
    const { data } = await productService.getProductBySlug(productSlug);
    return data?.data;
  };

  const {
    data: productData,
    isLoading: isLoadingProduct,
    error,
    refetch: refetchProduct,
  } = useQuery({
    queryKey: ["product-detail", productSlug],
    queryFn: getProductById,
    enabled: !!productSlug,
  });

  return {
    productData,
    isLoadingProduct,
    error,
    refetchProduct,
  };
};

export default useProductDetail;
