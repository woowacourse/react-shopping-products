import { CartItemApi, DeleteCartItemsParams } from "@/apis";
import { useMutation } from "@/modules";
import { GetCartItemsResponse } from "@/types";

export function useDeleteCartItemMutation() {
  return useMutation<DeleteCartItemsParams, GetCartItemsResponse>({
    mutationFn: CartItemApi.deleteCartItems,
  });
}
