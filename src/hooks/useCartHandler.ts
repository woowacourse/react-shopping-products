import { useCallback, useEffect } from 'react';
import {
  addCartItems,
  decreaseCartItems,
  getCartItems,
  increaseCartItems,
  removeCartItems,
} from '../services/cartItemServices';
import useFetchData from './useFetchData';
import { DEFAULT_ERROR_MESSAGE } from '../constants/errorMessages';
import { getCartId } from '../domain/cartItem';
import useDataContext from './useDataContext';
import { CartItemType } from '../types/data';
import DataMap from '../context/DataMap';

interface CartHandlerProps {
  handleErrorMessage: (errorMessage: string) => void;
}

const useCartHandler = ({ handleErrorMessage }: CartHandlerProps) => {
  const { data, setData, handleLoading } = useDataContext();
  const { fetchData: fetchCartItems } = useFetchData<CartItemType[]>({
    dataName: 'cartItems',
  });
  const { fetchData: updateCartItems } = useFetchData<CartItemType[]>({
    dataName: 'cartItemsUpdate',
  });

  const fetchTotalCartItems = useCallback(async () => {
    await fetchCartItems({
      apiCall: getCartItems,
      onSuccess: (newData) => {
        if (newData) {
          setData((prev) => new DataMap(prev).set('cartItems', newData));
        }
      },
      onError: (error) => {
        const message = error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE;
        handleErrorMessage(message);
      },
      handleLoading: (isLoading) => handleLoading(isLoading, 'cartItems'),
    });
  }, [fetchCartItems, handleErrorMessage, handleLoading]);

  useEffect(() => {
    fetchTotalCartItems();
  }, [fetchTotalCartItems]);

  const handleAddCartItem = useCallback(
    async (productId: number, quantity: number) => {
      await updateCartItems({
        apiCall: () => addCartItems({ productId, quantity }),
        onSuccess: fetchTotalCartItems,
        onError: (error) => {
          const message = error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE;
          handleErrorMessage(message);
        },
        handleLoading: (isLoading) => handleLoading(isLoading, 'cartItemsUpdate'),
      });
    },
    [fetchTotalCartItems, handleErrorMessage, handleLoading, updateCartItems],
  );

  const handleRemoveCartItem = useCallback(
    async (productId: number) => {
      const cartItems = data.get('cartItems');
      if (!cartItems) {
        throw new Error('장바구니에 해당 상품이 없어, 삭제에 실패했습니다.');
      }

      const cartId = getCartId(cartItems, productId);

      await updateCartItems({
        apiCall: () => removeCartItems(cartId),
        onSuccess: fetchTotalCartItems,
        onError: (error) => {
          const message = error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE;
          handleErrorMessage(message);
        },
        handleLoading: (isLoading) => handleLoading(isLoading, 'cartItemsUpdate'),
      });
    },
    [data, fetchTotalCartItems, handleErrorMessage, handleLoading, updateCartItems],
  );

  const handleIncreaseQuantity = useCallback(
    async (productId: number, quantity: number) => {
      const cartItems = data.get('cartItems');
      if (!cartItems) {
        throw new Error('장바구니에 해당 상품이 없어, 수량 추가에 실패했습니다.');
      }

      const cartId = getCartId(cartItems, productId);

      await updateCartItems({
        apiCall: () => increaseCartItems(cartId, quantity),
        onSuccess: fetchTotalCartItems,
        onError: (error) => {
          const message = error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE;
          handleErrorMessage(message);
        },
        handleLoading: (isLoading) => handleLoading(isLoading, 'cartItemsUpdate'),
      });
    },
    [data, fetchTotalCartItems, handleErrorMessage, handleLoading, updateCartItems],
  );

  const handleDecreaseQuantity = useCallback(
    async (productId: number, quantity: number) => {
      const cartItems = data.get('cartItems');
      if (!cartItems) {
        throw new Error('장바구니에 해당 상품이 없어, 수량 감소에 실패했습니다.');
      }

      const cartId = getCartId(cartItems, productId);

      await updateCartItems({
        apiCall: () => decreaseCartItems(cartId, quantity),
        onSuccess: fetchTotalCartItems,
        onError: (error) => {
          const message = error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE;
          handleErrorMessage(message);
        },
        handleLoading: (isLoading) => handleLoading(isLoading, 'cartItemsUpdate'),
      });
    },
    [data, fetchTotalCartItems, handleErrorMessage, handleLoading, updateCartItems],
  );

  return {
    cartItems: data.get('cartItems') ?? [],
    handleAddCartItem,
    handleRemoveCartItem,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
  };
};

export default useCartHandler;
