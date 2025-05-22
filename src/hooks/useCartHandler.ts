import { useEffect } from 'react';
import { getCartId } from '../domain/cartItem';
import { addCartItems, getCartItems, removeCartItems } from '../services/cartItemServices';
import { CartItemType } from '../types/data';
import useFetchData from './useFetchData';
import { DEFAULT_ERROR_MESSAGE } from '../constants/errorMessages';

interface CartHandlerProps {
  handleErrorMessage: (errorMessage: string) => void;
}

const useCartHandler = ({ handleErrorMessage }: CartHandlerProps) => {
  const { data: cartItems, fetchData: fetchCartItems } = useFetchData<CartItemType[]>({
    apiCall: getCartItems,
    dataName: 'cartItems',
    onSuccess: (items, dataHandler) => {
      dataHandler(items);
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE;
      handleErrorMessage(message);
    },
  });

  useEffect(() => {
    (async () => await fetchCartItems())();
  }, []);

  const handleAddCartItems = (id: number, quantity: number) => {
    const addItemInfo = {
      productId: id,
      quantity,
    };

    const { fetchData: fetchAddCartItems } = useFetchData<void>({
      apiCall: () => addCartItems(addItemInfo),
      dataName: 'cartItems',
      onSuccess: () => {
        fetchCartItems();
      },
      onError: (error) => {
        const message = error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE;
        handleErrorMessage(message);
      },
    });

    fetchAddCartItems();
  };

  const handleRemoveCartItems = (id: number) => {
    const cartId = getCartId(cartItems, id);

    const { fetchData: fetchRemoveCartItems } = useFetchData<CartItemType[]>({
      apiCall: () => removeCartItems(cartId),
      dataName: 'cartItems',
      onSuccess: () => {
        fetchCartItems();
      },
      onError: (error) => {
        const message = error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE;
        handleErrorMessage(message);
      },
    });

    fetchRemoveCartItems();
  };

  return {
    handleAddCartItems,
    handleRemoveCartItems,
  };
};

export default useCartHandler;
