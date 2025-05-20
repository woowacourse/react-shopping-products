import { useCartContext } from '../contexts/CartContext';

function useGetCarts() {
  const { carts, isLoading, isError, cartItemCount, fetchCarts } = useCartContext();

  return { isLoading, isError, carts, cartItemCount, refetchCarts: fetchCarts };
}

export default useGetCarts;
