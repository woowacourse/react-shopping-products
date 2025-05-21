import { CartProduct } from '../types';

const getCartById = (carts: CartProduct[], id: number) => {
  return carts.filter((cart) => cart.id === id);
};

export default getCartById;
