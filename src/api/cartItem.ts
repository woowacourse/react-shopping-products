import { fetchAPI } from "./fetch";
import { CartItem } from "@/types";

export const getCartItems = async () => {
  const data = await fetchAPI<{ content: CartItem[] }>({
    url: `cart-items`,
    method: "GET",
  });

  return data?.content;
};

export const postCartItem = async ({
  productId,
  quantity,
}: {
  productId: number;
  quantity: number;
}) => {
  await fetchAPI({
    url: "cart-items",
    method: "POST",
    body: {
      productId,
      quantity,
    },
  });
};

export const deleteCartItem = async (cartItemId: number) => {
  await fetchAPI({
    url: `cart-items/${cartItemId}`,
    method: "DELETE",
  });
};

export const patchCartItemQuantity = async ({
  cartItemId,
  quantity,
}: {
  cartItemId: number;
  quantity: number;
}) => {
  await fetchAPI({
    url: `cart-items/${cartItemId}`,
    method: "PATCH",
    body: {
      quantity,
    },
  });
};
