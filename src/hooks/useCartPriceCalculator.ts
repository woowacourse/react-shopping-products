import { CartItems } from "@/types/products";

const useCardPriceCalculator = () => {
  const calculateItemsPrice = (cartItems: CartItems[]) => {
    return cartItems.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  };

  return {
    calculateItemsPrice,
  };
};

export default useCardPriceCalculator;
