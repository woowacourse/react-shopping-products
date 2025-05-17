import { GetCartItemsResponse } from "../types/cartItem";
import { baseURL, baseHeaders } from "./base";

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
  const response = await fetch(`${baseURL}/cart-items?page=${page}&size=${size}&sort=${sort}`, {
    headers: baseHeaders,
  });
  if (!response.ok) {
    throw new Error("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
  }
  const data = await response.json();

  return data;
};

export const postCartItems = async ({ productId, quantity }: PostCartItemsParams) => {
  const response = await fetch(`${baseURL}/cart-items`, {
    method: "POST",

    headers: {
      ...baseHeaders,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId,
      quantity,
    }),
  });
  if (!response.ok) {
    throw new Error("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
  }
};

export const deleteCartItems = async ({ productId }: DeleteCartItemsParams) => {
  const response = await fetch(`${baseURL}/cart-items/${productId}`, {
    method: "DELETE",
    headers: {
      ...baseHeaders,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
  }
};
