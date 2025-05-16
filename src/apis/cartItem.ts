import { GetCartItemsResponse } from "@/types/response/cartItem";

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
  const response = await fetch(`${import.meta.env.VITE_API_URL}/cart-items?page=${page}&size=${size}&sort=${sort}`, {
    headers: {
      Authorization: `Basic ${import.meta.env.VITE_TOKEN}`,
    },
  });
  if (!response.ok) {
    throw new Error("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
  }
  const data = await response.json();

  return data;
};

export const postCartItems = async ({ productId, quantity }: PostCartItemsParams) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/cart-items`, {
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

  if (!response.ok) {
    throw new Error("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
  }
};

export const deleteCartItems = async ({ cartItemId }: DeleteCartItemsParams) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/cart-items/${cartItemId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Basic ${import.meta.env.VITE_TOKEN}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
  }
};
