import { CartItemsAPI } from "../apis/cartItems";
import { CartItems } from "../apis/types/cartItems";
import { useData } from "../contexts/DataContext";

const useCartItems = () => {
  const {
    data: cartItems,
    error: errorMessage,
    setError: setErrorMessage,
    refetch: refreshCartItems,
  } = useData<CartItems>({
    key: "cartItems",
    fetcher: CartItemsAPI.get,
  });

  const cartItemInfo =
    cartItems?.content.map((productInfo) => ({
      cartId: productInfo.id,
      productId: productInfo.product.id,
      quantity: productInfo.quantity,
    })) ?? [];

  return {
    cartItemInfo,
    errorMessage,
    setErrorMessage,
    refreshCartItems,
  };
};

export default useCartItems;
