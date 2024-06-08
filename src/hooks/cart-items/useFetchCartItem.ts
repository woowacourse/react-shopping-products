import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useToasts from "../useToasts";

import { fetchCartItem } from "../../apis/cart-item";

import { QUERY_KEYS } from "../../constants/queries";

export default function useFetchCartItem() {
  const { addToast } = useToasts();

  const { data, error, isLoading } = useQuery({
    queryFn: fetchCartItem,
    queryKey: [QUERY_KEYS.cartItems],
    retry: false,
  });

  useEffect(() => {
    if (error && error instanceof Error) {
      addToast(error.message);
    }
  }, [error, addToast]);

  const cartItemLength = data?.length;

  const totalPrice = data?.reduce(
    (accPrice, currCartItem) => accPrice + currCartItem.product.price * currCartItem.quantity,
    0,
  );

  const checkIsInCart = (productId: number) => {
    if (!data) return false;

    return data.some((cartItem) => cartItem.product.id === productId);
  };

  const getCartItem = (productId: number) => {
    return data?.find((cartItem) => cartItem.product.id === productId);
  };

  return {
    cartItems: data ?? [],
    isLoading,
    cartItemLength,
    totalPrice,
    checkIsInCart,
    getCartItem,
  };
}
