import { END_POINT } from "@/config/endPoint";
import { CartItems } from "@/types/products";
import { getQuantityInCart } from "@/utils/cart";
import { useQueryClient } from "@tanstack/react-query";

const useCardPriceCalculator = () => {
  const queryClient = useQueryClient();

  const cartItems = queryClient.getQueryData<CartItems[]>([END_POINT.cartItems]) || [];

  const calculateItemsPrice = () => {
    const totalPrice = cartItems.reduce((sum, item) => {
      const quantity = getQuantityInCart(cartItems, item.product.id);
      sum += item.product.price * quantity;
      return sum;
    }, 0);
    return totalPrice;
  };

  return {
    calculateItemsPrice,
  };
};

export default useCardPriceCalculator;
