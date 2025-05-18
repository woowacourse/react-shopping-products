import { GetCartItemsResponse } from "../types/cartItem";
import baseFetch from "./baseFetch";

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
  productId: number;
}

export const getCartItems = async ({ page, size, sort = "asc" }: GetCartItemsParams): Promise<GetCartItemsResponse> => {
  return baseFetch(`/cart-items?page=${page}&size=${size}&sort=${sort}`);
};

export const postCartItems = async ({ productId, quantity }: PostCartItemsParams) => {
  return baseFetch(
    "/cart-items",
    {
      method: "POST",
      body: JSON.stringify({ productId, quantity }),
    },
    false,
  );
};

export const deleteCartItems = async ({ productId }: DeleteCartItemsParams) => {
  return baseFetch(`/cart-items/${productId}`, { method: "DELETE" }, false);
};
