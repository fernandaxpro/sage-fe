import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";


const productService = {
    getProductBySlug: (slug: string) => instance.get(`${endpoint.CUSTOMER}/product/catalog/${slug}`),
}

export default productService;