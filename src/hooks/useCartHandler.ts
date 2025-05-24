import { useCallback, useEffect } from 'react';
import {
  addCartItems,
  decreaseCartItems,
  getCartItems,
  increaseCartItems,
  removeCartItems,
} from '../services/cartItemServices';
import { CartItemType } from '../types/data';
import useFetchData from './useFetchData';
import { DEFAULT_ERROR_MESSAGE } from '../constants/errorMessages';
import { getCartId } from '../domain/cartItem';
import useDataContext from './useDataContext';

interface CartHandlerProps {
  handleErrorMessage: (errorMessage: string) => void;
}

const useCartHandler = ({ handleErrorMessage }: CartHandlerProps) => {
  const { data, setData, isLoading } = useDataContext();
  const { fetchData: fetchCartItems } = useFetchData<CartItemType[]>({
    dataName: 'cartItems',
  });

  const fetchTotalCartItems = useCallback(async () => {
    await fetchCartItems({
      apiCall: getCartItems,
      onSuccess: (newData) => {
        if (newData) {
          setData((prev) => new Map(prev).set('cartItems', newData));
        }
      },
      onError: (error) => {
        const message = error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE;
        handleErrorMessage(message);
      },
    });
  }, [fetchCartItems, handleErrorMessage]);

  useEffect(() => {
    fetchTotalCartItems();
  }, []);

  const handleAddCartItem = useCallback(
    async (productId: number, quantity: number) => {
      await fetchCartItems({
        apiCall: () => addCartItems({ productId, quantity }),
        onSuccess: fetchTotalCartItems,
        onError: (error) => {
          const message = error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE;
          handleErrorMessage(message);
        },
      });
    },
    [fetchCartItems, fetchTotalCartItems, handleErrorMessage],
  );

  const handleRemoveCartItem = useCallback(
    async (productId: number) => {
      const cartItems = data.get('cartItems') as CartItemType[];
      const cartId = getCartId(cartItems, productId) as number;

      await fetchCartItems({
        apiCall: () => removeCartItems(cartId),
        onSuccess: fetchTotalCartItems,
        onError: (error) => {
          const message = error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE;
          handleErrorMessage(message);
        },
      });
    },
    [data, fetchCartItems, fetchTotalCartItems, handleErrorMessage],
  );

  const handleIncreaseQuantity = useCallback(
    async (productId: number, quantity: number) => {
      const cartItems = data.get('cartItems') as CartItemType[];
      const cartId = getCartId(cartItems, productId) as number;

      await fetchCartItems({
        apiCall: () => increaseCartItems(cartId, quantity),
        onSuccess: fetchTotalCartItems,
        onError: (error) => {
          const message = error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE;
          handleErrorMessage(message);
        },
      });
    },
    [fetchCartItems, fetchTotalCartItems, handleErrorMessage],
  );

  const handleDecreaseQuantity = useCallback(
    async (productId: number, quantity: number) => {
      const cartItems = data.get('cartItems') as CartItemType[];
      const cartId = getCartId(cartItems, productId) as number;

      await fetchCartItems({
        apiCall: () => decreaseCartItems(cartId, quantity),
        onSuccess: fetchTotalCartItems,
        onError: (error) => {
          const message = error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE;
          handleErrorMessage(message);
        },
      });
    },
    [fetchCartItems, fetchTotalCartItems, handleErrorMessage],
  );

  return {
    cartItems: (data.get('cartItems') as CartItemType[]) ?? [],
    isCartItemsLoading: isLoading.get('cartItems') ?? false,
    handleAddCartItem,
    handleRemoveCartItem,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
  };
};

export default useCartHandler;
