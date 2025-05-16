import { GetCartItemsResponse } from "@/types/response/cartItem";
import BaseApi from "./BaseApi";

interface GetCartItemsParams {
  page: number;
  size: number;
  sort?: "asc" | "desc";
}

interface PostCartItemsParams {
  productId: number;
  quantity: number;
}

interface DeleteCartItemsParams {
  cartItemId: number;
}

export const getCartItems = async ({ page, size, sort = "asc" }: GetCartItemsParams): Promise<GetCartItemsResponse> => {
  const response = await BaseApi.get(`/cart-items?page=${page}&size=${size}&sort=${sort}`);
  return response;
};

export const postCartItems = async ({ productId, quantity }: PostCartItemsParams) => {
  await BaseApi.post(`/cart-items`, {
    method: "POST",
    body: JSON.stringify({
      productId,
      quantity,
    }),
  });
};

export const deleteCartItems = async ({ cartItemId }: DeleteCartItemsParams) => {
  await BaseApi.delete(`/cart-items/${cartItemId}`);
};
