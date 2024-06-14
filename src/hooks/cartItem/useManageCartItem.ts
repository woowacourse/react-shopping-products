import { CartItem } from "../../types/cartItems";
import useAddItemToCart from "./useAddItemToCart";
import { useCallback } from "react";
import useFetchCartItem from "./useFetchCartItem";
import useHandleQuantityInCart from "./useHandleQuantityInCart";
import useRemoveItemFromCart from "./useRemoveItemFromCart";

const useManageCartItem = () => {
  const { data, isLoading, error } = useFetchCartItem();

  const { mutateAsync: postCartItems, isPending: isAddItemLoading } =
    useAddItemToCart();
  const { mutateAsync: deleteCartItems, isPending: isDeleteItemLoading } =
    useRemoveItemFromCart();
  const { mutateAsync: patchCartItem, isPending: isPatchItemLoading } =
    useHandleQuantityInCart();

  const itemQuantityInCart = useCallback(
    (id: number) =>
      data?.content.find((item: CartItem) => item.product.id === id)
        ?.quantity || 0,
    [data?.content]
  );

  const addItemToCart = useCallback(
    async (productId: number) => {
      await postCartItems(productId);
    },
    [postCartItems]
  );

  const removeItemFromCart = useCallback(
    async (productId: number) => {
      const targetCartItem = data?.content.find(
        (item: CartItem) => item.product.id === productId
      );

      if (!targetCartItem) {
        throw new Error("장바구니에 없는 상품입니다.");
      }

      const targetCartItemId = targetCartItem.id;

      await deleteCartItems(targetCartItemId);
    },
    [data?.content, deleteCartItems]
  );

  const editQuantityInCart = useCallback(
    async ({ id: productId, quantity }: { id: number; quantity: number }) => {
      const targetCartItem = data?.content.find(
        (item: CartItem) => item.product.id === productId
      );

      if (!targetCartItem) {
        throw new Error("장바구니에 없는 상품입니다.");
      }

      const targetCartItemId = targetCartItem.id;
      await patchCartItem({ id: targetCartItemId, quantity });
    },
    [data?.content, patchCartItem]
  );

  return {
    cartItems: data?.content,
    addItemToCart,
    removeItemFromCart,
    editQuantityInCart,
    itemQuantityInCart,
    isLoading:
      isLoading ||
      isAddItemLoading ||
      isDeleteItemLoading ||
      isPatchItemLoading,
    error,
  };
};

export default useManageCartItem;
