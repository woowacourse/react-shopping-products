import { useFetchCartItems } from '../index';

const useFetchProductQuantity = () => {
  const { cartItems } = useFetchCartItems();

  const getCartItemByProduct = (id: number) => {
    return cartItems.find((item) => item.product.id === id) ?? null;
  };

  return { getCartItemByProduct };
};

export default useFetchProductQuantity;
