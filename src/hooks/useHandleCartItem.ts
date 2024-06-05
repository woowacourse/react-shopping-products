import { useCartItemsQuery } from "@/hooks/server/useCartItems";

const useHandleCartItem = () => {
  const { data: cartItems, isLoading } = useCartItemsQuery();

  const getQuantityInCart = (id: number) => {
    if (cartItems) {
      const targetItem = cartItems.find((cartItem) => cartItem.product.id === id);
      if (targetItem) {
        return targetItem.quantity;
      }
      return 0;
    }
    return 0;
  };

  const convertProductIdToCartId = (productId: number) => {
    if (cartItems) {
      const targetItem = cartItems.find((cartItem) => cartItem.product.id === productId);
      if (targetItem) {
        return targetItem.id;
      }
      return null;
    }
  };

  return { isLoading, cartItems, getQuantityInCart, convertProductIdToCartId, cartItemLength: cartItems?.length || 0 };
};

export default useHandleCartItem;
