import { useMemo, useState } from 'react';
import useProducts from './useProducts';
import useCart from './useCart';
import { getMergedData } from '../utils';

const useProductPage = () => {
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const { products, loading } = useProducts({ filterType: filter, sortingType: sort });
  const { cartProducts, handleCartProducts } = useCart();

  const cartLength = cartProducts.length;
  const mergedData = useMemo(() => getMergedData(products, cartProducts), [products, cartProducts]);

  return {
    filter,
    sort,
    setFilter,
    setSort,
    cartLength,
    mergedData,
    loading,
    handleCartProducts,
  };
};

export default useProductPage;
