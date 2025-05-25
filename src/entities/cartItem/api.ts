import {
  createApiUrl,
  createResourceUrl,
  deleteData,
  getData,
  patchData,
  postData,
} from "../../shared/api/apiClient";
import { SHOP_API } from "../../shared/api/config";
import { CartItems } from "./response";

const URL = SHOP_API.endpoint.cartItems;

export const CartItemsAPI = {
  get: async () => {
    const params: Record<string, string> = { page: "0", size: "50" };
    return getData<CartItems>(createApiUrl(URL, params));
  },

  post: async (productId: number) => {
    const data = { productId, quantity: 1 };
    return postData(createApiUrl(URL), data);
  },

  delete: async (cartId: number) => {
    return deleteData(createResourceUrl(URL, cartId));
  },

  patch: async (cartId: number, quantity: number) => {
    const data = { id: cartId, quantity };
    return patchData(createResourceUrl(URL, cartId), data);
  },
};
