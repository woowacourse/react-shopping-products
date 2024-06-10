import { useEffect, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCartItems } from '../../../api/cart';
import { ToastContext } from '../../../context/ToastProvider';
import { SIZE } from '../../../constants/api';
import { QUERY_KEYS } from '../../../constants/queryKeys';
import { ERROR_MESSAGES } from '../../../constants/message';

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

  const { data, isFetching, isPaused, error } = useQuery({
    queryKey: [QUERY_KEYS.CART],
    queryFn: getCartItems,
  });

  useEffect(() => {
    if (error) showToast(error.message);
  }, [error]);

  useEffect(() => {
    if (isPaused && !navigator.onLine) showToast(ERROR_MESSAGES.OFFLINE);
  }, [isPaused]);

  return {
    cartItems: data ?? [],
    isFetching,
    error,
  };
};

export default useFetchCartItems;
