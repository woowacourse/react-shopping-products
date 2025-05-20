import { useEffect, useState } from 'react';
import { getCartId } from '../domain/cartItem';
import { addCartItems, getCartItems, removeCartItems } from '../services/cartItemServices';
import tryApiCall from '../util/tryApiCall';
import { CartItemType } from '../types/data';

interface CartHandlerProps {
  handleErrorMessage: (errorMessage: string) => void;
}

const useCartHandler = ({ handleErrorMessage }: CartHandlerProps) => {
  const [cartItemsIds, setCartItemsIds] = useState<number[]>([]);

  useEffect(() => {
    (async () => {
      const items = await tryApiCall(getCartItems, handleErrorMessage);
      if (items) {
        setCartItemsIds(items.map((item: CartItemType) => item.product.id));
      }
    })();
  }, []);

  const handleAddCartItemsIds = (id: number) => {
    const addItemInfo = {
      productId: id,
      quantity: 1,
    };
    (async () => {
      await tryApiCall(async () => await addCartItems(addItemInfo), handleErrorMessage);
      setCartItemsIds((prev: number[]) => [...prev, id]);
    })();
  };

  const handleRemoveCartItemsIds = (id: number) => {
    (async () => {
      const cartItems = (await tryApiCall<CartItemType[]>(getCartItems, handleErrorMessage)) ?? [];
      const cartId = getCartId(cartItems, id);

      if (cartId) {
        await tryApiCall(async () => await removeCartItems(cartId), handleErrorMessage);
        setCartItemsIds((prev: number[]) => prev.filter((itemId: number) => itemId !== id));
      }
    })();
  };

  return {
    cartItemsIds,
    setCartItemsIds,
    handleAddCartItemsIds,
    handleRemoveCartItemsIds,
  };
};

export default useCartHandler;
