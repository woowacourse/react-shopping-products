import useFetchCartItems from '../useFetchCartItems/useFetchCartItems';

const useFetchProductQuantity = () => {
  const { cartItems } = useFetchCartItems();

  const getProductQuantity = (id: number) => {
    return cartItems.find((item) => item.product.id === id);
  };

  return { getProductQuantity };
};

export default useFetchProductQuantity;
