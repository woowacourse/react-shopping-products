import { QUERY_KEYS } from "../../constants/queryKeys";
import { patchCartItem } from "../../api/cartItems";
import useCustomMutation from "../useCustomMutation";

const useHandleQuantityInCart = () => {
  return useCustomMutation({
    mutationFn: ({ id, quantity }: { id: number; quantity: number }) =>
      patchCartItem(id, quantity),
    queryKey: [QUERY_KEYS.CART_ITEMS],
  });
};

export default useHandleQuantityInCart;
