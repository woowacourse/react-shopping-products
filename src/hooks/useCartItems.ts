import { CartItemsAPI } from "../apis/cartItems";
import { CartItems } from "../apis/types/cartItems";
import { useData } from "../contexts/DataContext";

const useCartItems = () => {
  const {
    data: cartItems,
    error: fetchError,
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
    fetchError,
    refreshCartItems,
  };
};

export default useCartItems;
