/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import qs from "qs";

const productService = {
  getProductList: (params: any) =>
    instance.get(`${endpoint.CUSTOMER}/product/catalog`, {
      params: {
        ...params,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, {
          arrayFormat: "repeat", // category_ids=2&category_ids=4
          skipNulls: true, // Skip null/undefined values
        });
      },
    }),

  getProductBySlug: (slug: string) =>
    instance.get(`${endpoint.CUSTOMER}/product/catalog/${slug}`),
  getProductCategories: () =>
    instance.get(`${endpoint.ADMIN}/catalogue/categories`),
  getProductBrands: (params?: { page?: number; perPage?: number }) =>
    instance.get(`${endpoint.ADMIN}/catalogue/brand`, {
      params,
    }),
  getProductAttribute: (params?: { page?: number; perPage?: number }) =>
    instance.get(`${endpoint.ADMIN}/catalogue/attribute`, {
      params,
    }),
};

export default productService;
