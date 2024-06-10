import { CartItem } from "../../types/cartItems";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { ToastContext } from "../../components/Toasts/ToastProvider";
import { getCartItems } from "../../api/cartItems";
import useAddItemToCart from "./useAddItemToCart";
import { useCallback } from "react";
import useCustomContext from "../useCustomContext";
import useHandleQuantityInCart from "./useHandleQuantityInCart";
import { useQuery } from "@tanstack/react-query";
import useRemoveItemFromCart from "./useRemoveItemFromCart";

const useManageCartItem = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.CART_ITEMS],
    queryFn: async () => {
      const prevData = await getCartItems();
      const size = prevData.totalElements;
      return getCartItems(size);
    },
  });

  const { failAlert } = useCustomContext(ToastContext);

  const { mutateAsync: postCartItems } = useAddItemToCart();
  const { mutateAsync: deleteCartItems } = useRemoveItemFromCart();
  const { mutateAsync: patchCartItem } = useHandleQuantityInCart();

  const itemQuantityInCart = useCallback(
    (id: number) =>
      data?.content.find((item: CartItem) => item.product.id === id)
        ?.quantity || 0,
    [data?.content]
  );

  const addItemToCart = useCallback(
    async (productId: number) => {
      try {
        await postCartItems(productId);
      } catch (error) {
        if (error instanceof Error) failAlert(error.message);
      }
    },
    [postCartItems, failAlert]
  );

  const removeItemFromCart = useCallback(
    async (productId: number) => {
      try {
        const targetCartItem = data?.content.find(
          (item: CartItem) => item.product.id === productId
        );

        if (!targetCartItem) {
          throw new Error("장바구니에 없는 상품입니다.");
        }

        const targetCartItemId = targetCartItem.id;

        await deleteCartItems(targetCartItemId);
      } catch (error) {
        if (error instanceof Error) failAlert(error.message);
      }
    },
    [data?.content, deleteCartItems, failAlert]
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
    isLoading,
    error,
  };
};

export default useManageCartItem;
