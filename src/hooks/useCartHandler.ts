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

  const setTempCartItem = useCallback(
    (productId: number, newQuantity: number) => {
      setData((prev) => {
        const products = prev.get('products') ?? [];
        const targetItem = products.find((item) => item.id === productId);
        if (!targetItem) {
          throw new Error('해당 상품이 존재하지 않습니다. 상품 목록을 확인해주세요.');
        }

        return new DataMap(prev).set('cartItems', [
          ...(prev.get('cartItems') ?? []),
          { id: -productId, quantity: newQuantity, product: targetItem },
        ]);
      });
    },
    [setData],
  );

  const removeTempCartItem = useCallback(
    (cartId: number) => {
      setData((prev) => {
        const cartItems = prev.get('cartItems') ?? [];
        const nonTempCartItem = cartItems.filter((item) => item.id !== cartId);
        return new DataMap(prev).set('cartItems', nonTempCartItem);
      });
    },
    [setData],
  );

  const setTempCartItemsQuantity = useCallback(
    (cartId: number, newQuantity: number) => {
      setData((prev) => {
        const cartItems = prev.get('cartItems') ?? [];
        const targetItem = cartItems.find((item) => item.id === cartId);
        if (!targetItem) {
          throw new Error('장바구니에 해당 상품이 없습니다. 장바구니를 확인해주세요.');
        }

        const existingItems = cartItems.filter((item) => item.id !== cartId);
        return new DataMap(prev).set('cartItems', [
          ...existingItems,
          { ...targetItem, quantity: newQuantity },
        ]);
      });
    },
    [setData],
  );

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
  }, [fetchCartItems, handleErrorMessage, handleLoading, setData]);

  useEffect(() => {
    fetchTotalCartItems();
  }, [fetchTotalCartItems]);

  const handleAddCartItem = useCallback(
    async (productId: number, quantity: number) => {
      await updateCartItems({
        apiCall: () => addCartItems({ productId, quantity }),
        onSuccess: async () => {
          setTempCartItem(productId, quantity);
          await fetchTotalCartItems();
        },
        onError: (error) => {
          const message = error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE;
          handleErrorMessage(message);
        },
        handleLoading: (isLoading) => handleLoading(isLoading, 'cartItemsUpdate'),
      });
    },
    [fetchTotalCartItems, handleErrorMessage, handleLoading, updateCartItems, setTempCartItem],
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
        onSuccess: async () => {
          removeTempCartItem(cartId);
          await fetchTotalCartItems();
        },
        onError: (error) => {
          const message = error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE;
          handleErrorMessage(message);
        },
        handleLoading: (isLoading) => handleLoading(isLoading, 'cartItemsUpdate'),
      });
    },
    [
      data,
      fetchTotalCartItems,
      handleErrorMessage,
      handleLoading,
      updateCartItems,
      removeTempCartItem,
    ],
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
        onSuccess: async () => {
          setTempCartItemsQuantity(cartId, quantity);
          await fetchTotalCartItems();
        },
        onError: (error) => {
          const message = error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE;
          handleErrorMessage(message);
        },
        handleLoading: (isLoading) => handleLoading(isLoading, 'cartItemsUpdate'),
      });
    },
    [
      data,
      fetchTotalCartItems,
      handleErrorMessage,
      handleLoading,
      updateCartItems,
      setTempCartItemsQuantity,
    ],
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
        onSuccess: async () => {
          setTempCartItemsQuantity(cartId, quantity);
          await fetchTotalCartItems();
        },
        onError: (error) => {
          const message = error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE;
          handleErrorMessage(message);
        },
        handleLoading: (isLoading) => handleLoading(isLoading, 'cartItemsUpdate'),
      });
    },
    [
      data,
      fetchTotalCartItems,
      handleErrorMessage,
      handleLoading,
      updateCartItems,
      setTempCartItemsQuantity,
    ],
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
