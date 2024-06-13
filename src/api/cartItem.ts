import { fetchPost, fetchPatch, fetchGet, fetchDelete } from "./fetch";

export const getCartItems = async () => {
  const data = await fetchGet("cart-items");
  return data?.content;
};

export const postCartItem = async ({
  productId,
  quantity,
}: {
  productId: number;
  quantity: number;
}) => {
  await fetchPost("cart-items", {
    productId,
    quantity,
  });
};

export const deleteCartItem = async (cartItemId: number) => {
  await fetchDelete(`cart-items/${cartItemId}`);
};

export const patchCartItemQuantity = async ({
  cartItemId,
  quantity,
}: {
  cartItemId: number;
  quantity: number;
}) => {
  await fetchPatch(`cart-items/${cartItemId}`, {
    quantity,
  });
};
