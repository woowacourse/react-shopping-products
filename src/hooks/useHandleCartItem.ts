import { deleteCartItem, getCartItems, postCartItem } from "@/apis/cartItem";
import { END_POINT } from "@/config/endPoint";
import { ERROR_MESSAGES } from "@/constants/messages";
import { useCartItemsQuery } from "@/hooks/server/useCartItems";
import useToast from "@/hooks/useToast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { CartItemContext, CartItemDispatchContext } from "@/provider/cartItemProvider";
import { useState } from "react";

const useHandleCartItem = () => {
  const { data: cartItems, isLoading } = useCartItemsQuery();

  const { onAddToast } = useToast();

  // const onAddCartItem = async (id: number) => {
  //   if (cartItems.length === MAX_CART_COUNT) return onAddToast(ERROR_MESSAGES.failPushCart);

  //   try {
  //     setLoading(true);

  //     await postCartItem({ productId: id, quantity: 1 });
  //     const fetchedItems = await getCartItems();
  //     setCartItems(fetchedItems);
  //   } catch (error) {
  //     onAddToast(ERROR_MESSAGES.failPostCartItem);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const onDeleteCartItem = async (id: number) => {
  //   const targetItem = cartItems.find((cartItem) => cartItem.product.id === id);
  //   try {
  //     setLoading(true);
  //     await deleteCartItem({ itemId: targetItem!.id });
  //     setCartItems((cartItems) => cartItems.filter((item) => item !== targetItem));
  //   } catch (error) {
  //     onAddToast(ERROR_MESSAGES.failDeleteCartItem);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const isInCart = (id: number) => {
  //   return cartItems.some((item) => item.product.id === id);
  // };

  const isInCart = (id: number) => cartItems?.find((item) => item.id === id);

  const getQuantityInCart = (id: number) => {
    if (cartItems) {
      const targetItem = cartItems.find((cartItem) => cartItem.product.id === id);
      if (targetItem) {
        return targetItem.quantity;
      }
    }

    return 0;
  };

  // const onClickCartItem = (id: number) => {
  //   if (isInCart(id)) {
  //     onDeleteCartItem(id);
  //   } else {
  //     onAddCartItem(id);
  //   }
  // };

  return { isLoading, cartItems, getQuantityInCart, isInCart };
};

export default useHandleCartItem;
