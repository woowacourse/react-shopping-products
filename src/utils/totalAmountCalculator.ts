import { Carts } from '../types/fetch';

const totalAmountCalculator = (cartItems: Carts[]) => {
  return cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
};

export default totalAmountCalculator;
