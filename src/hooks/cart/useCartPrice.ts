import useGetCartListQuery from './useGetCartListQuery';

const useCartPrice = () => {
  const { data: cartList } = useGetCartListQuery();

  const totalPrice =
    cartList?.reduce((acc, cur) => acc + cur.product.price * cur.quantity, 0) ??
    0;

  return totalPrice;
};

export default useCartPrice;
