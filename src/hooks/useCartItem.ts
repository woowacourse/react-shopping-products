import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  requestAddCartItem,
  requestDeleteCartItem,
  requestFetchCartItemList,
  requestUpdateCartItemQuantity,
} from "../apis/cartItems";

import { Product } from "../interfaces/Product";

export default function useCartItem() {
  const queryClient = useQueryClient();

  const fetchCartItemList = useQuery({
    queryKey: ["cartItemList"],
    queryFn: () => requestFetchCartItemList(),
    staleTime: Infinity,
  });
  const addCartItem = useMutation({
    mutationFn: (product: Product) => requestAddCartItem(product.id, 1),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItemList"] });
    },
  });

  const deleteCartItem = useMutation({
    mutationFn: (cartItemId: number) => requestDeleteCartItem(cartItemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItemList"] });
    },
  });

  const updateCartItemQuantity = useMutation({
    mutationFn: ({
      cartItemId,
      quantity,
    }: {
      cartItemId: number;
      quantity: number;
    }) => requestUpdateCartItemQuantity({ cartItemId, quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItemList"] });
    },
  });

  return {
    fetchCartItemList,
    cartItemList: fetchCartItemList.data?.content,
    addCartItem,
    deleteCartItem,
    updateCartItemQuantity,
  };
}
