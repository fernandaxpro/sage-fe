import productService from "@/services/product.service";
import { useQuery } from "@tanstack/react-query";

interface UseProductListParams {
  page: number;
  perPage: number;
}

const useProductList = ({ page, perPage}: UseProductListParams) => {

  const getProductList = async () => {
    const { data } = await productService.getProductList(page, perPage);
    return data;
  };

   const {
    data: productList,
    isLoading: isLoadingProductList,
    error,
    refetch: refetchProductList,
  } = useQuery({
    queryKey: ["product-list", page, perPage], 
    queryFn: getProductList,
  });

  return {
    productList,
    isLoadingProductList,
    error,
    refetchProductList,
  };
}

export default useProductList