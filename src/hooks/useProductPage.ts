import { useMemo, useState } from 'react';
import useProducts from './useProducts';
import useCart from './useCart';
import useError from './useError';
import { addCart, removeCart } from '../utils/api';
import { getMergedData } from '../utils';

const useProductPage = () => {
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const { products, loading } = useProducts({ filterType: filter, sortingType: sort });
  const { cartProducts, fetchCartProducts } = useCart();
  const { showError } = useError();

  const cartLength = cartProducts.length;
  const mergedData = useMemo(() => getMergedData(products, cartProducts), [products, cartProducts]);

  const handleAddCart = async (productId: number) => {
    try {
      await addCart(productId);
      await fetchCartProducts();
    } catch {
      showError('장바구니 추가 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleRemoveCart = async (cartId: number) => {
    try {
      await removeCart(cartId);
      await fetchCartProducts();
    } catch {
      showError('장바구니 삭제 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return {
    filter,
    sort,
    setFilter,
    setSort,
    cartLength,
    mergedData,
    loading,
    handleAddCart,
    handleRemoveCart,
  };
};

export default useProductPage;
