import { GetCartItemsResponse } from "../types/cartItem";

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
  const response = await fetch(`${import.meta.env.VITE_API_URL}/cart-items?page=${page}&size=${size}&sort=${sort}`, {
    headers: {
      Authorization: `Basic ${import.meta.env.VITE_TOKEN}`,
    },
  });
  const data = await response.json();

  return data;
};

export const postCartItems = async ({ productId, quantity }: PostCartItemsParams) => {
  await fetch(`${import.meta.env.VITE_API_URL}/cart-items`, {
    method: "POST",

    headers: {
      Authorization: `Basic ${import.meta.env.VITE_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId,
      quantity,
    }),
  });
};

export const deleteCartItems = async ({ productId }: DeleteCartItemsParams) => {
  await fetch(`${import.meta.env.VITE_API_URL}/cart-items/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Basic ${import.meta.env.VITE_TOKEN}`,
      "Content-Type": "application/json",
    },
  });
};
