/* eslint-disable @typescript-eslint/no-explicit-any */
import productService from "@/services/product.service";
import { ICategory, ISelectOption } from "@/types/Product";
import { useQuery } from "@tanstack/react-query";

interface UseProductListParams {
  page: number;
  perPage: number;
  categoryIds?: number[];
  brandIds?: number[];
}

const useProductList = ({
  page,
  perPage,
  categoryIds,
  brandIds,
}: UseProductListParams) => {

  const getProductList = async () => {
    const params: any = {
      page,
      perPage,
    };

    if (categoryIds && categoryIds.length > 0) {
      params.category_ids = categoryIds;
    }

    if (brandIds && brandIds.length > 0) {
      params.brand_ids = brandIds;
    }

    const { data } = await productService.getProductList(params);
    return data;
  };

  const {
    data: productList,
    isLoading: isLoadingProductList,
    error,
    refetch: refetchProductList,
  } = useQuery({
    queryKey: ["product-list", page, perPage, categoryIds, brandIds],
    queryFn: getProductList,
  });

  const { data: dataCategories } = useQuery({
    queryKey: ['dataCategories'],
    queryFn: async () => {
      const res = await productService.getProductCategories();
      return res.data.data.map((item: ICategory): ISelectOption => ({
        value: item.id,
        label: item.name,
      }));
    },
  });

  return {
    dataCategories,
    productList,
    isLoadingProductList,
    error,
    refetchProductList,
  };
}

export default useProductList