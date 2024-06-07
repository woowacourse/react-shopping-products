import { fetchAPI } from "./fetch";
import { CartItem } from "@/types";

export const getCartItems = async () => {
  const data = await fetchAPI<{ content: CartItem[] }>({
    url: `cart-items`,
    method: "GET",
  });

  return data.content;
};

export const postCartItem = async (productId: number, quantity: number) => {
  fetchAPI({
    url: "cart-item",
    method: "POST",
    body: {
      productId,
      quantity,
    },
  });
};

export const deleteCartItem = async (cartItemId: number) => {
  fetchAPI({
    url: `cart-item/${cartItemId}`,
    method: "DELETE",
  });
};

export const patchCartItemQuantity = async (
  cartItemId: number,
  quantity: number
) => {
  fetchAPI({
    url: `cart-item/${cartItemId}`,
    method: "PATCH",
    body: {
      quantity,
    },
  });
};
