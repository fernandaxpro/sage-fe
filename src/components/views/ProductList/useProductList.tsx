/* eslint-disable @typescript-eslint/no-explicit-any */
import productService from "@/services/product.service";
import { IBrand, ICategory, ISelectOption } from "@/types/Product";
import { useQuery } from "@tanstack/react-query";

interface UseProductListParams {
  page: number;
  perPage: number;
  categoryIds?: number[];
  brandIds?: number[];
  attribute_value?: string
}

const useProductList = ({
  page,
  perPage,
  categoryIds,
  brandIds,
  attribute_value
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

    if(attribute_value && attribute_value !== '') {
      params.attribute_value = attribute_value
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
    queryKey: ["product-list", page, perPage, categoryIds, brandIds, attribute_value],
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

  const { data: dataBrands = [] } = useQuery({
    queryKey: ['dataCategories'],
    queryFn: async () => {
      const res = await productService.getProductBrands({
        page: 1,
        perPage: 1000,
      });
      return res.data.data.map((item: IBrand): ISelectOption => ({
        value: item.id,
        label: item.name,
      }));
    },
  });

  const { data: dataAttributes = [] } = useQuery({
    queryKey: ['dataAttributes'],
    queryFn: async () => {
      const res = await productService.getProductAttribute({
        page: 1,
        perPage: 1000,
      });
      return res.data.data;
    },
  });

  return {
    dataCategories,
    dataBrands,
    dataAttributes,

    productList,
    isLoadingProductList,
    error,
    refetchProductList,
  };
}

export default useProductList