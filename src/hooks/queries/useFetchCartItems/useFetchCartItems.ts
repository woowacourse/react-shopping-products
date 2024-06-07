import { useEffect, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCartItems } from '../../../api/cart';
import { ToastContext } from '../../../context/ToastProvider';
import { SIZE } from '../../../constants/api';

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

  const { data, isLoading, error } = useQuery({
    queryKey: ['cart'],
    queryFn: getCartItems,
    retry: false,
  });

  useEffect(() => {
    if (error) showToast(error.message);
  }, [error, showToast]);

  return {
    cartItems: data ?? [],
    isLoading,
    error,
  };
};

export default useFetchCartItems;
