import { useMutation, useQueryClient } from "@tanstack/react-query";
import { requestAddCartItem } from "../apis/cartItems";

import { Product } from "../interfaces/Product";

export default function useAddCartItem() {
  const queryClient = useQueryClient();
  const addCartItem = useMutation({
    mutationFn: (product: Product) => requestAddCartItem(product.id, 1),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItemList"] });
    },
  });

  return {
    addCartItem,
  };
}
