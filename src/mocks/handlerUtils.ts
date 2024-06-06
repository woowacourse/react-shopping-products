import { AddCartRequest, CartItem } from "../types/cartItems";
import cartItemMockData from "./data/cartItems.json";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isValidCartItemRequestBody(value: any): value is AddCartRequest {
  if (
    !value ||
    typeof value !== "object" ||
    typeof value.productId !== "number" ||
    typeof value.quantity !== "number"
  ) {
    return false;
  }
  return true;
}

export function CartMockClosure() {
  let cartMockData = cartItemMockData;

  const getCartMockData = () => {
    return JSON.parse(JSON.stringify(cartItemMockData));
  };

  const pushCartItem = (mockCartItem: CartItem) => {
    cartMockData.content = [...cartMockData.content, mockCartItem];
  };

  const deleteCartItem = (id: number) => {
    cartMockData.content = cartMockData.content.filter((el: CartItem) => el.id !== id);
  };

  const resetCartItems = () => {
    cartMockData = cartItemMockData;
  };

  const modifyCartItemQuantity = (id: number, quantity: number) => {
    const item = cartMockData.content.find((el: CartItem) => el.id === id);
    if (item) {
      item.quantity = quantity;
    }
  };

  return {
    getCartMockData,
    pushCartItem,
    deleteCartItem,
    resetCartItems,
    modifyCartItemQuantity,
  };
}
