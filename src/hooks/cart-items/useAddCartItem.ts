import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToasts from "../useToasts";

import { addCartItem } from "../../apis/cart-item";

import { QUERY_KEYS } from "../../constants/queries";

export default function useAddCartItem() {
  const queryClient = useQueryClient();
  const { addToast } = useToasts();

  const { mutate } = useMutation({
    networkMode: "always",
    retry: false,
    mutationFn: addCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cartItems] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        addToast(error.message);
      }
    },
  });

  return {
    handleAddCartItem: mutate,
  };
}
