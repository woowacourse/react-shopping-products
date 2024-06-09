import { CartItem } from '@/types/cartItem.type';

const calculateTotalAmount = (cartItems: CartItem[]) => {
  const totalAmount = cartItems.reduce((acc, cur) => {
    return acc + cur.quantity * cur.product.price;
  }, 0);
  return totalAmount;
};

export default calculateTotalAmount;
