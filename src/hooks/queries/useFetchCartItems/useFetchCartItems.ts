import { useEffect, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCartItems } from '../../../api/cart';
import { ToastContext } from '../../../context/ToastProvider';
import { SIZE } from '../../../constants/api';
import { QUERY_KEYS } from '../../../constants/queryKeys';

const useFetchCartItems = () => {
  const { showToast } = useContext(ToastContext);

  const getCartItems = async () => {
    const { data: initialData, totalElements } = await fetchCartItems();

    if (totalElements <= SIZE.DEFAULT) {
      return initialData;
    }

    const { data: totalData } = await fetchCartItems(totalElements);
    return totalData;
  };

  const { data, isFetching, error } = useQuery({
    queryKey: [QUERY_KEYS.CART],
    queryFn: getCartItems,
  });

  useEffect(() => {
    if (error) showToast(error.message);
  }, [error, showToast]);

  return {
    cartItems: data ?? [],
    isFetching,
    error,
  };
};

export default useFetchCartItems;
