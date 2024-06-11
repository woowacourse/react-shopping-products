import { CartItems } from "@/types/products";

export const getQuantityInCart = (cartItems: CartItems[], id: number) => {
  console.log("getQuantityInCart");
  if (cartItems) {
    const targetItem = cartItems.find((cartItem) => cartItem.product.id === id);
    if (targetItem) {
      return targetItem.quantity;
    }
    return 0;
  }
  return 0;
};

export const convertProductIdToCartId = (cartItems: CartItems[], productId: number) => {
  console.log("convertProductIdToCartId");
  if (cartItems) {
    const targetItem = cartItems.find((cartItem) => cartItem.product.id === productId);
    if (targetItem) {
      return targetItem.id;
    }
    return null;
  }
};
