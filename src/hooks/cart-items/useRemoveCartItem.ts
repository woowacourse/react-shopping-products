import { useMutation, useQueryClient } from "@tanstack/react-query";

import { removeCartItem } from "../../apis/cart-item";

import { QUERY_KEYS } from "../../constants/queries";

interface UseRemoveCartItemResult {
  handleRemoveCartItem: (cartItemId: number) => void;
  error: unknown;
}

export default function useRemoveCartItem(): UseRemoveCartItemResult {
  const queryClient = useQueryClient();

  const { mutate, error } = useMutation({
    networkMode: "always",
    retry: false,
    mutationFn: removeCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cartItems] });
    },
  });

  return {
    handleRemoveCartItem: mutate,
    error,
  };
}
