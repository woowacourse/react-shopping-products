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
import { MockCartItemType } from '../mocks/dummy';

interface CartHandlerProps {
  handleErrorMessage: (errorMessage: string) => void;
}

const useCartHandler = ({ handleErrorMessage }: CartHandlerProps) => {
  const { data, setData, isLoading, handleLoading } = useDataContext();
  const { fetchData: fetchCartItems } = useFetchData<MockCartItemType[]>({
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
      handleLoading: (isLoading) => handleLoading(isLoading, 'cartItems'),
    });
  }, [fetchCartItems, handleErrorMessage, handleLoading]);

  useEffect(() => {
    fetchTotalCartItems();
  }, [fetchTotalCartItems]);

  const handleAddCartItem = useCallback(
    async (productId: number, quantity: number) => {
      await fetchCartItems({
        apiCall: () => addCartItems({ productId, quantity }),
        onSuccess: fetchTotalCartItems,
        onError: (error) => {
          const message = error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE;
          handleErrorMessage(message);
        },
        handleLoading: (isLoading) => handleLoading(isLoading, 'cartItems'),
      });
    },
    [fetchCartItems, fetchTotalCartItems, handleErrorMessage, handleLoading],
  );

  const handleRemoveCartItem = useCallback(
    async (productId: number) => {
      const cartItems = data.get('cartItems') as MockCartItemType[];
      const cartId = getCartId(cartItems, productId) as number;

      await fetchCartItems({
        apiCall: () => removeCartItems(cartId),
        onSuccess: fetchTotalCartItems,
        onError: (error) => {
          const message = error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE;
          handleErrorMessage(message);
        },
        handleLoading: (isLoading) => handleLoading(isLoading, 'cartItems'),
      });
    },
    [data, fetchCartItems, fetchTotalCartItems, handleErrorMessage, handleLoading],
  );

  const handleIncreaseQuantity = useCallback(
    async (productId: number, quantity: number) => {
      const cartItems = data.get('cartItems') as MockCartItemType[];
      const cartId = getCartId(cartItems, productId) as number;

      await fetchCartItems({
        apiCall: () => increaseCartItems(cartId, quantity),
        onSuccess: fetchTotalCartItems,
        onError: (error) => {
          const message = error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE;
          handleErrorMessage(message);
        },
        handleLoading: (isLoading) => handleLoading(isLoading, 'cartItems'),
      });
    },
    [data, fetchCartItems, fetchTotalCartItems, handleErrorMessage, handleLoading],
  );

  const handleDecreaseQuantity = useCallback(
    async (productId: number, quantity: number) => {
      const cartItems = data.get('cartItems') as MockCartItemType[];
      const cartId = getCartId(cartItems, productId) as number;

      await fetchCartItems({
        apiCall: () => decreaseCartItems(cartId, quantity),
        onSuccess: fetchTotalCartItems,
        onError: (error) => {
          const message = error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE;
          handleErrorMessage(message);
        },
        handleLoading: (isLoading) => handleLoading(isLoading, 'cartItems'),
      });
    },
    [data, fetchCartItems, fetchTotalCartItems, handleErrorMessage, handleLoading],
  );

  return {
    cartItems: (data.get('cartItems') as MockCartItemType[]) ?? [],
    isCartItemsLoading: isLoading.get('cartItems') ?? false,
    handleAddCartItem,
    handleRemoveCartItem,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
  };
};

export default useCartHandler;
