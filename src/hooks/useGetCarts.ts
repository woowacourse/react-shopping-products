import { useCartContext } from '../contexts/CartContext';

function useGetCarts() {
  const { carts, isLoading, isError, cartItemCount, fetchCarts } = useCartContext();

  const refetchCarts = async () => {
    return await fetchCarts(false);
  };

  return { isLoading, isError, carts, cartItemCount, refetchCarts };
}

export default useGetCarts;
