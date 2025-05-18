import { CartItem } from "../types/productType";

const isInCart = (cartItem: CartItem[], id: number) => {
  return cartItem.some((item) => item.product.id === id);
};

export default isInCart;
