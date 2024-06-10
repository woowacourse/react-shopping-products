import { patchCartItemQuantityChange, removeCartItem } from "../api/cart";
import { CART } from "../constants";
import { useCart, useError } from "../context";

interface CartItemQuantity {
  id: number;
  quantity: number;
}

export const useChangeCartItemQuantity = () => {
  const { fetchCartItems } = useCart();
  const { setErrorStatus } = useError();

  const incrementQuantity = async ({ id, quantity }: CartItemQuantity) => {
    const newQuantity = quantity + CART.QUANTITY_CHANGE_STEP;
    try {
      await patchCartItemQuantityChange(id, newQuantity);
      await fetchCartItems();
    } catch (error: any) {
      setErrorStatus(error.response?.status);
    }
  };

  const decrementQuantity = async ({ id, quantity }: CartItemQuantity) => {
    const newQuantity = quantity - CART.QUANTITY_CHANGE_STEP;
    if (newQuantity > 0) {
      try {
        await patchCartItemQuantityChange(id, newQuantity);
        await fetchCartItems();
      } catch (error: any) {
        setErrorStatus(error.response?.status);
      }
    } else {
      try {
        await removeCartItem(id);
        await fetchCartItems();
      } catch (error: any) {
        setErrorStatus(error.response?.status);
      }
    }
  };

  return { incrementQuantity, decrementQuantity };
};
