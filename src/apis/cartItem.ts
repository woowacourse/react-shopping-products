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

interface PatchCartItemsParams {
  id: number;
  quantity: number;
}

interface DeleteCartItemsParams {
  id: number;
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

export const patchCartItems = async ({ id, quantity }: PatchCartItemsParams) => {
  return baseFetch(
    `/cart-items/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify({ quantity }),
    },
    false,
  );
};

export const deleteCartItems = async ({ id }: DeleteCartItemsParams) => {
  return baseFetch(`/cart-items/${id}`, { method: "DELETE" }, false);
};
