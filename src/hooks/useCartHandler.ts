import { useCallback, useEffect } from 'react';
import { addCartItems, getCartItems, removeCartItems } from '../services/cartItemServices';
import { CartItemType } from '../types/data';
import useFetchData from './useFetchData';
import { DEFAULT_ERROR_MESSAGE } from '../constants/errorMessages';
import { getCartId } from '../domain/cartItem';

interface CartHandlerProps {
  handleErrorMessage: (errorMessage: string) => void;
}

const useCartHandler = ({ handleErrorMessage }: CartHandlerProps) => {
  const {
    data: cartItems,
    setDataMap,
    fetchData: fetchCartItems,
  } = useFetchData<CartItemType[]>({
    dataName: 'cartItems',
  });

  const fetchTotalCartItems = useCallback(async () => {
    await fetchCartItems({
      apiCall: getCartItems,
      onSuccess: (newData) => {
        if (newData) {
          setDataMap((prev) => new Map(prev).set('cartItems', newData));
        }
      },
      onError: (error) => {
        const message = error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE;
        handleErrorMessage(message);
      },
    });
  }, [fetchCartItems, handleErrorMessage, setDataMap]);

  useEffect(() => {
    (async () => await fetchTotalCartItems())();
  }, [fetchTotalCartItems]);

  const handleAddCartItems = useCallback(
    async (productId: number, quantity: number) => {
      await fetchCartItems({
        apiCall: () => addCartItems({ productId, quantity }),
        onSuccess: () => {
          fetchTotalCartItems();
        },
        onError: (error) => {
          const message = error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE;
          handleErrorMessage(message);
        },
      });
    },
    [fetchCartItems, fetchTotalCartItems, handleErrorMessage],
  );

  const handleRemoveCartItems = useCallback(
    async (id: number) => {
      const cartId = getCartId(cartItems, id) as number;

      await fetchCartItems({
        apiCall: () => removeCartItems(cartId),
        onSuccess: () => {
          fetchTotalCartItems();
        },
        onError: (error) => {
          const message = error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE;
          handleErrorMessage(message);
        },
      });
    },
    [fetchCartItems, cartItems, fetchTotalCartItems, handleErrorMessage],
  );

  return {
    cartItems,
    handleAddCartItems,
    handleRemoveCartItems,
  };
};

export default useCartHandler;
