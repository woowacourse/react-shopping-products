import { QUERY_KEYS } from "../../constants/queryKeys";
import { postCartItems } from "../../api/cartItems";
import useCustomMutation from "../useCustomMutation";

const useAddItemToCart = () => {
  return useCustomMutation({
    mutationFn: (productId: number) =>
      postCartItems({ productId, quantity: 1 }),
    queryKey: [QUERY_KEYS.CART_ITEMS],
  });
};

export default useAddItemToCart;
