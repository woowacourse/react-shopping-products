import { CartItem } from '../type/CartItem';

export const calculateTotalAmount = (cartItem: CartItem[]) => {
  return cartItem.reduce((prevTotalAmount: number, currentItem: CartItem) => {
    return prevTotalAmount + currentItem.quantity * currentItem.product.price;
  }, 0);
};
