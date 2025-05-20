import { CartProduct, Product } from '../types';

const getMergedData = (products: Product[], cartProducts: CartProduct[]) => {
  const mergedData = products.map((product) => {
    const cart = cartProducts.find((item) => item.product.id === product.id);
    return cart
      ? { ...product, cartInfo: { id: cart.id, quantity: cart.quantity } }
      : { ...product, cartInfo: { id: -1, quantity: 0 } };
  });

  return mergedData;
};

export default getMergedData;
