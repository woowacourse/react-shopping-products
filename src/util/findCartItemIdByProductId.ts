import { fetchItems } from "../api";

export const findCartItemIdByProductId = async (productId: number) => {
    const response = await fetchItems();
    const cartItem = response.find((cartItem) => {
      if (cartItem.product.id === productId) {
        return cartItem.id;
      }
    });
    return cartItem && cartItem.id;
  };