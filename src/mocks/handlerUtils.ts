import { AddCartRequestPayload, ICartItem } from "../types/cartItems";
import cartItemMockData from "./data/cartItems.json";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isValidCartItemRequestBody(value: any): value is AddCartRequestPayload {
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
  let cartMockData = JSON.parse(JSON.stringify(cartItemMockData));

  const getCartMockData = () => {
    return JSON.parse(JSON.stringify(cartMockData));
  };

  const pushCartItem = (mockCartItem: ICartItem) => {
    cartMockData.content = [...cartMockData.content, mockCartItem];
  };

  const deleteCartItem = (id: number) => {
    cartMockData.content = cartMockData.content.filter((el: ICartItem) => el.id !== id);
  };

  const resetCartItems = () => {
    cartMockData = JSON.parse(JSON.stringify(cartItemMockData));
  };

  const modifyCartItemQuantity = (id: number, quantity: number) => {
    const item = cartMockData.content.find((el: ICartItem) => el.id === id);
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
