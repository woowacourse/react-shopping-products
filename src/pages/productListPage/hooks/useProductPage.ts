import { useEffect, useState } from 'react';
import { useCartItemList } from '../context/useCartContext';
import { cartApi } from '../../../api/cartApi';
import { productApi } from '../../../api/productApi';
import { ResponseProduct } from '../../../api/types';
import { useError } from '../../../contexts/ErrorContext';

export const useProductPage = () => {
  const [productList, setProductList] = useState<ResponseProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { cartItemList, setCartItemList } = useCartItemList();
  const { showError } = useError();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rawCartItemList, rawProductList] = await Promise.all([
          cartApi.get({
            size: 20,
            page: 0,
          }),
          productApi.get({ size: 20, page: 0, category: '', sort: 'price,asc' }),
        ]);

        setCartItemList(rawCartItemList);
        setProductList(rawProductList);
      } catch (error) {
        if (error instanceof Error) {
          showError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [showError, setCartItemList]);

  return { productList, setProductList, cartItemList, isLoading };
};
