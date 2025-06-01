import { CartItemApi, PostCartItemsParams } from "@/apis";
import { useMutation } from "@/modules";
import { GetCartItemsResponse } from "@/types";

export function usePostCartItemMutation() {
  return useMutation<PostCartItemsParams, GetCartItemsResponse>({
    mutationFn: CartItemApi.postCartItems,
  });
}
