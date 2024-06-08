import { CartItem, getCartItems } from "@src/apis/cartItems";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../__constants__/queryKeys";

export const useCartAmount = () => {
  const queryResult = useQuery({
    queryKey: [QUERY_KEYS.cartItems],
    queryFn: getCartItems,
    select: (cartItems) => calculateCartAmount(cartItems),
  });

  return {
    ...queryResult,
    data: queryResult.data ?? 0,
  };
};

const calculateCartAmount = (cartItems: CartItem[]) => {
  return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
};
