import { useEffect, useState } from 'react';
import { CartItemData, CartItemListData } from '@/types';
import { BASE_URL } from '@/constants/baseUrl';
import { API_ROUTES } from '@/constants/route';
import useFetch from './useFetch';
import token from '@/api/token';
import { deleteCartItemById, addCartItemByProductId } from '@/api';
import toast from '@/services/toast';
import ERROR_MESSAGE from '@/constants/errorMessage';

const MAX_CART_LENGTH = 50;
const DEFAULT_TOAST_DURATION = 1000;

const useCartItemList = () => {
  const [cartItemList, setCartItemList] = useState<CartItemData[]>([]);
  const url = `${BASE_URL.PRODUCT}${API_ROUTES.CART_ITEM}?size=50`;
  const { data, isLoading, refetch } = useFetch<CartItemListData>(url, {
    headers: { Authorization: token },
  });

  useEffect(() => {
    if (data?.content) {
      setCartItemList(data.content);
    }
  }, [data]);

  const addCartItem = async (productId: number) => {
    try {
      if (cartItemList.length + 1 > MAX_CART_LENGTH) {
        toast.error(ERROR_MESSAGE.MAX_CART_LENGTH);
        return;
      }
      await addCartItemByProductId(productId, 1);
      refetch();
    } catch (error) {
      toast.error(ERROR_MESSAGE.FAIL_ADD_CART_ITEM, DEFAULT_TOAST_DURATION);
    }
  };

  const deleteCartItem = async (cartItemId: number) => {
    try {
      await deleteCartItemById(cartItemId);
      refetch();
    } catch (error) {
      toast.error(ERROR_MESSAGE.FAIL_DELETE_CART_ITEM, DEFAULT_TOAST_DURATION);
    }
  };

  const toggleCartItem = async (productId: number) => {
    const cartItem = cartItemList.find(({ product }) => product.id === productId);

    try {
      if (cartItem) {
        await deleteCartItem(cartItem.id);
      } else {
        await addCartItem(productId);
      }
    } catch (error) {
      toast.error(ERROR_MESSAGE.FAIL_FETCH, DEFAULT_TOAST_DURATION);
    }
  };

  return { cartItemList, isLoading, toggleCartItem };
};

export default useCartItemList;
