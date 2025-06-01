import { CartItemApi, PatchCartItemsParams } from "@/apis";
import { useMutation } from "@/modules";

export function usePatchCartItemMutation() {
  return useMutation<PatchCartItemsParams, void>({
    mutationFn: CartItemApi.patchCartItems,
  });
}
