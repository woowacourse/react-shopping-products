import { patchCartItemQuantity } from "../../api/cartItems";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/queryKeys";

const usePatchCartItemQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchCartItemQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.cartItems] });
    },
  });
};

export default usePatchCartItemQuantity;
