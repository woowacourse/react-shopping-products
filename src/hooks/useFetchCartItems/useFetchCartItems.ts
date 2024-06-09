import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { usePagination } from '../index';
import { fetchCartItems } from '../../api/cartItems';
import { Carts } from '../../types/fetch';
import { QUERY_KEYS } from '../../constants/queryKeys';

const useFetchCartItems = () => {
  const { page, fetchNextPage, resetPage, isLast, setIsLast } = usePagination();

  const [cartItems, setCartItems] = useState<Carts[]>([]);

  const query = useQuery({
    queryKey: [QUERY_KEYS.cartItems],
    queryFn: () => fetchCartItems(page),
  });

  useEffect(() => {
    if (!query.data) return;

    setIsLast(query.data.last);

    if (page === 0) {
      setCartItems(query.data.content);
      return;
    }
    setCartItems((prevCartItems) => [...prevCartItems, ...query.data.content]);
  }, [query.data]);

  return {
    ...query,
    cartItems: cartItems,
    fetchNextPage,
    resetPage,
    isLast,
  };
};

export default useFetchCartItems;
