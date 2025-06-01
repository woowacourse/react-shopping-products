import { CartItemApi, PatchCartItemsParams } from "@/apis";
import { useMutation } from "@/modules";
import { GetCartItemsResponse } from "@/types";

export function usePatchCartItemMutation() {
  return useMutation<PatchCartItemsParams, GetCartItemsResponse>({
    mutationFn: CartItemApi.patchCartItems,
  });
}
