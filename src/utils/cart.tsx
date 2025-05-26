import { CartItemTypes } from "../types/CartItemType";

export function findIsCartItem(
  items: CartItemTypes[],
  productId: number
): CartItemTypes | undefined {
  return items.find((item) => item.product.id === productId);
}

export function isCartFull(
  cartItems: CartItemTypes[],
  maxCount: number = 50
): boolean {
  return cartItems.length >= maxCount;
}
