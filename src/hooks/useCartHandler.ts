import { useCallback, useEffect } from 'react';
import { addCartItems, getCartItems, removeCartItems } from '../services/cartItemServices';
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

  const handleAddCartItems = useCallback(
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

  const handleRemoveCartItems = useCallback(
    async (id: number) => {
      const cartItems = data.get('cartItems') as CartItemType[];
      const cartId = getCartId(cartItems, id) as number;

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

  return {
    cartItems: (data.get('cartItems') as CartItemType[]) ?? [],
    isCartItemsLoading: isLoading.get('cartItems') ?? false,
    handleAddCartItems,
    handleRemoveCartItems,
  };
};

export default useCartHandler;
