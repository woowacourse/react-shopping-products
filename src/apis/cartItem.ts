import { GetCartItemsResponse } from "@/types/response/cartItem";
import BaseApi from "./BaseApi";

interface GetCartItemsParams {
  page?: number;
  size?: number;
  sort?: "asc" | "desc";
}
export const getCartItems = async ({
  page = 0,
  size = 20,
  sort = "asc",
}: GetCartItemsParams = {}): Promise<GetCartItemsResponse> => {
  const searchParams = new URLSearchParams({
    page: String(page),
    size: String(size),
    sort,
  });
  const response = await BaseApi.get(`/cart-items?${searchParams.toString()}`);
  return response;
};

interface PostCartItemsParams {
  productId: number;
  quantity?: number;
}
export const postCartItems = async ({ productId, quantity = 1 }: PostCartItemsParams) => {
  await BaseApi.post(`/cart-items`, {
    body: JSON.stringify({
      productId,
      quantity,
    }),
  });
};

interface DeleteCartItemsParams {
  cartItemId: number;
}
export const deleteCartItems = async ({ cartItemId }: DeleteCartItemsParams) => {
  await BaseApi.delete(`/cart-items/${cartItemId}`);
};
