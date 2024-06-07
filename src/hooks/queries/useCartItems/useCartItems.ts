import { useQuery } from '@tanstack/react-query';
import { fetchCartItems } from '../../../api/cart';
import { Cart } from '../../../types/Cart.type';
import { SIZE } from '../../../constants/api';

interface UseCartItemsResult {
  cartItems: Cart[];
  isLoading: boolean;
  isError: boolean;
}

const useCartItems = (): UseCartItemsResult => {
  const getCartItems = async () => {
    const { data: initialData, totalElements } = await fetchCartItems();

    if (totalElements <= SIZE.DEFAULT) {
      return initialData;
    }

    const { data: totalData } = await fetchCartItems(totalElements);
    return totalData;
  };

  const {
    data: cartItems,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['cart'],
    queryFn: getCartItems,
  });

  return {
    cartItems: cartItems ?? [],
    isLoading,
    isError,
  };
};

export default useCartItems;
