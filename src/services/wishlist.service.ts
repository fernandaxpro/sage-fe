import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const wishlistService = {
  getWishlist: () => instance.get(`${endpoint.CUSTOMER}/product/wishlist`),

  postWishlist: (productId: string) =>
    instance.post(`${endpoint.CUSTOMER}/product/wishlist`, {
      productId,
    }),

  deleteWishlist: (productId: string) =>
    instance.delete(`${endpoint.CUSTOMER}/product/wishlist/${productId}`),
};

export default wishlistService;
