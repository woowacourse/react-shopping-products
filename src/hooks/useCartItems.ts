import { useEffect, useState } from 'react';

import { addCartItem, deleteCartItem, fetchCartItems } from '@/api/cart';
import { CartItemInfo } from '@/types/cartItem';

const useCartItems = () => {
  const [cartItems, setCartItems] = useState<CartItemInfo[]>([]);

  const matchCartItem = (productId: number) => {
    return cartItems.find((cartItem) => cartItem.product.id === productId);
  };

  const handleAddCartItem = async (productId: number) => {
    if (matchCartItem(productId)) return;

    await addCartItem({ productId });
    await refreshCartItems();
  };

  const handleDeleteCartItem = async (productId: number) => {
    const matchedCartItemInfo = matchCartItem(productId);
    if (!matchedCartItemInfo) return;

    const cartItemId = matchedCartItemInfo.id;
    await deleteCartItem(cartItemId);
    await refreshCartItems();
  };

  const refreshCartItems = async () => {
    const data = await fetchCartItems();
    setCartItems(data);
  };

  useEffect(() => {
    refreshCartItems();
  }, []);

  return { cartItems, handleAddCartItem, handleDeleteCartItem, matchCartItem };
};

export default useCartItems;
