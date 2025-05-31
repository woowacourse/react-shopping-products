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
  const { data, setData, isLoading, handleLoading } = useDataContext();
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
      const cartItems = data.get('cartItems') as CartItemType[];
      const cartId = getCartId(cartItems, productId) as number;

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
      const cartItems = data.get('cartItems') as CartItemType[];
      const cartId = getCartId(cartItems, productId) as number;

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
      const cartItems = data.get('cartItems') as CartItemType[];
      const cartId = getCartId(cartItems, productId) as number;

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
    isCartItemsLoading: isLoading.get('cartItems') ?? true,
    handleAddCartItem,
    handleRemoveCartItem,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
  };
};

export default useCartHandler;
