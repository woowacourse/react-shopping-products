import { getCartItems } from "@/apis/cartItem";
import QUERY_KEY from "@/constants/queryKey";
import TIMER from "@/constants/timer";
import { useQuery } from "@tanstack/react-query";

const useCartItems = () => {
  const { data: cartItems } = useQuery({
    queryKey: [QUERY_KEY.getCartItems],
    queryFn: getCartItems,
    gcTime: TIMER.hour,
    staleTime: TIMER.hour,
  });

  const isInCart = (productId: number) => {
    if (!cartItems) return false;

    return cartItems.some((item) => item.product.id === productId);
  };

  const totalAmount = () => {
    if (!cartItems) return 0;

    return cartItems.reduce((amount, cur) => {
      return amount + cur.quantity * cur.product.price;
    }, 0);
  };

  return { cartItems, isInCart, totalAmount };
};

export default useCartItems;
