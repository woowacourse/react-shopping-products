import { useEffect, useState } from 'react';
import { useCartItemList } from '../context/useCartContext';
import { cartApi } from '../../../api/cartApi';
import { productApi } from '../../../api/productApi';
import { ResponseProduct } from '../../../api/types';

export const useProductPage = () => {
  const [productList, setProductList] = useState<ResponseProduct[]>([]);
  const { cartItemList, setCartItemList, setErrorMessage, setIsLoading, isLoading } = useCartItemList();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rawCartItemList, rawProductList] = await Promise.all([cartApi.get(), productApi.get({ category: '', sort: 'price,asc' })]);

        setCartItemList(rawCartItemList);
        setProductList(rawProductList);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return { productList, setProductList, cartItemList, isLoading };
};
