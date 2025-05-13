import { Product } from '../../App';

const isInCart = (cart: Product[], id: number) => {
  return cart.some((item) => item.id === id);
};

export default isInCart;
