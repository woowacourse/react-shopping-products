import { CartItemTypes } from "../../types/CartItemType";

export function findIsCartItem(items: CartItemTypes[], productId: number) {
  return items.find((item) => item.product.id === productId);
}

export function isCartFull(cartItems: CartItemTypes[], maxCount: number = 50) {
  return cartItems.length >= maxCount;
}
