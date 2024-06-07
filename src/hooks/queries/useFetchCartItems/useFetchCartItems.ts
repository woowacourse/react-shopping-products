import { useQuery } from '@tanstack/react-query';
import { fetchCartItems } from '../../../api/cart';
import { SIZE } from '../../../constants/api';

const useFetchCartItems = () => {
  const getCartItems = async () => {
    const { data: initialData, totalElements } = await fetchCartItems();

    if (totalElements <= SIZE.DEFAULT) {
      return initialData;
    }

    const { data: totalData } = await fetchCartItems(totalElements);
    return totalData;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['cart'],
    queryFn: getCartItems,
  });

  return {
    cartItems: data ?? [],
    isLoading,
    isError,
  };
};

export default useFetchCartItems;
