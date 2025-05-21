import { PATH } from "@/constants";
import { GetCartItemsResponse } from "@/types";
import BaseApi from "./BaseApi";

interface GetCartItemsParams {
  page?: number;
  size?: number;
  sort?: "asc" | "desc";
}

interface PostCartItemsParams {
  productId: number;
  quantity?: number;
}

interface DeleteCartItemsParams {
  cartItemId: number;
}

interface PatchCartItemsParams {
  cartItemId: number;
  quantity: number;
}

export default class CartItemApi extends BaseApi {
  static async getCartItems({
    page = 0,
    size = 20,
    sort = "asc",
  }: GetCartItemsParams = {}): Promise<GetCartItemsResponse> {
    const searchParams = new URLSearchParams({
      page: String(page),
      size: String(size),
      sort,
    });
    return BaseApi.get(`${PATH.cartItems}?${searchParams.toString()}`);
  }

  static async postCartItems({ productId, quantity = 1 }: PostCartItemsParams) {
    return BaseApi.post(`${PATH.cartItems}`, {
      body: JSON.stringify({ productId, quantity }),
    });
  }

  static async deleteCartItems({ cartItemId }: DeleteCartItemsParams) {
    return BaseApi.delete(`${PATH.cartItems}/${cartItemId}`);
  }

  static async patchCartItems({ cartItemId, quantity }: PatchCartItemsParams) {
    return BaseApi.patch(`${PATH.cartItems}/${cartItemId}`, {
      body: JSON.stringify({ quantity }),
    });
  }
}
