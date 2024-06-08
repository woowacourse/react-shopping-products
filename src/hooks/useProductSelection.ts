import { useState, useEffect } from 'react';
import { CartItemType } from '../types';
import useAddCartItem from './useAddCartItem';
import { useToast } from './useToast';

interface Props {
  cartItems: CartItemType[] | undefined;
  productToCartIdMap: Record<number, number>;
  popCartItem: (itemId: number) => Promise<boolean>;
  getCartItems: () => Promise<void>;
}

export function useProductSelection({ cartItems, productToCartIdMap, popCartItem }: Props) {
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const { mutate, isError, isSuccess } = useAddCartItem();

  const { showToast } = useToast();

  useEffect(() => {
    const newSelectedItems: number[] = [];
    const cartItemIds = cartItems?.map((cartItem) => cartItem.product.id);

    cartItems?.forEach((product) => {
      if (cartItemIds?.includes(product.product.id)) {
        newSelectedItems.push(product.product.id);
      }
    });
    setSelectedItems(new Set(newSelectedItems));
  }, [cartItems]);

  const handleSelect = async (itemId: number) => {
    const newSelectedItems = new Set(selectedItems);
    if (selectedItems.has(itemId)) {
      const result = await popCartItem(productToCartIdMap[itemId]);
      if (result) newSelectedItems.delete(itemId);
    } else {
      mutate(itemId);

      if (isSuccess) {
        newSelectedItems.add(itemId);
      }
      if (isError) {
        showToast({ message: '장바구니 상품 추가에 실패했습니다.', duration: 3000 });
      }
    }
    setSelectedItems(newSelectedItems);
  };

  return { selectedItems, handleSelect };
}
