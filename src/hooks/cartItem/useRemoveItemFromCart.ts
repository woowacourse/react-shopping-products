import { QUERY_KEYS } from "../../constants/queryKeys";
import { deleteCartItems } from "../../api/cartItems";
import useCustomMutation from "../useCustomMutation";

const useRemoveItemFromCart = () => {
  return useCustomMutation({
    mutationFn: (targetCartItemId: number) => deleteCartItems(targetCartItemId),
    queryKey: [QUERY_KEYS.CART_ITEMS],
  });
};

export default useRemoveItemFromCart;
