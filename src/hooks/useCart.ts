import { useState } from "react";
import { CartItem, Product } from "../types/productType";
import postCartItems from "../api/postCartItems";
import patchCartItemQuantity from "../api/patchCartItemQuantity";

export const CART_MAX_COUNT = 50;

const useCart = ({
  setErrorMessage,
  refetchCartItems: refetch,
}: {
  setErrorMessage: (errorMessage: string) => void;
  refetchCartItems: () => void;
}) => {
  const addToCart = async (product: Product) => {
    // if (cart.length > CART_MAX_COUNT) {
    //   setErrorMessage(
    //     `장바구니에 담을 수 있는 상품은 최대 ${CART_MAX_COUNT}개입니다.`
    //   );
    //   return;
    // }
    const { error } = await postCartItems(product);
    setErrorMessage(error?.message || "");

    if (!error?.message) {
      refetch();
    }
  };

  const patchQuantity = async (id: number, quantity: number) => {
    const { error } = await patchCartItemQuantity(id, quantity);
    setErrorMessage(error?.message || "");

    if (!error?.message) {
      refetch();
    }
  };

  return { addToCart, patchQuantity };
};

export default useCart;
