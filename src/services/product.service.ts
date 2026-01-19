import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const productService = {
  getProductList: (page: number, perPage: number) =>
    instance.get(`${endpoint.CUSTOMER}/product/catalog`, {
      params: {
        page,
        perPage,
      },
    }),
  getProductBySlug: (slug: string) =>
    instance.get(`${endpoint.CUSTOMER}/product/catalog/${slug}`),
};

export default productService;
