import { useEffect, useState } from 'react';
import postCartItem from '../api/postCartItem';
import deleteCartItem from '../api/deleteCartItem';
import { AddCartItemType, cartDataType } from '../types/cartItem';
import { CART_LIMIT } from '../constants/carts';

function useCartManagement({
  refetchCarts,
  carts,
}: {
  refetchCarts: () => void;
  carts: cartDataType[] | null;
}) {
  const [isErrorAddCardItem, setIsErrorAddCardItem] = useState(false);
  const [isErrorDeleteCardItem, setIsErrorDeleteCardItem] = useState(false);
  const [isOverItemCounts, setIsOverItemCounts] = useState(false);
  const [itemCount, setItemCount] = useState(0);

  const handleAddCartItem = async ({ productId, quantity }: AddCartItemType) => {
    if (itemCount >= CART_LIMIT) {
      setIsOverItemCounts(true);
      setTimeout(() => {
        setIsOverItemCounts(false);
      }, 3000);

      return;
    }

    const res = await postCartItem({
      productId,
      quantity,
    });

    if (!res.ok) {
      setIsErrorAddCardItem(true);
      setTimeout(() => {
        setIsErrorAddCardItem(false);
      }, 3000);
    }

    await refetchCarts();
  };

  const handleDeleteCartItem = async ({ productId }: { productId: number }) => {
    const cartId = carts?.filter((cart) => cart.product.id === productId)[0].id || 0;
    const res = await deleteCartItem({ cartId });

    if (!res.ok) {
      setIsErrorDeleteCardItem(true);
      setTimeout(() => {
        setIsErrorDeleteCardItem(false);
      }, 3000);
    }

    await refetchCarts();
  };

  useEffect(() => {
    if (carts) {
      setItemCount(new Set(carts?.map((cart) => cart.product.id)).size);
    }
  }, [carts]);

  return {
    handleAddCartItem,
    handleDeleteCartItem,
    isErrorAddCardItem,
    isErrorDeleteCardItem,
    isOverItemCounts,
    itemCount,
  };
}

export default useCartManagement;
