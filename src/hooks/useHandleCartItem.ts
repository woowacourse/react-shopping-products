import { CartItems } from "@/types/products";

const useHandleCartItem = () => {
  // const { data: cartItems, isLoading } = useCartItemsQuery();

  const getQuantityInCart = (cartItems: CartItems[], id: number) => {
    if (cartItems) {
      const targetItem = cartItems.find((cartItem) => cartItem.product.id === id);
      if (targetItem) {
        return targetItem.quantity;
      }
      return 0;
    }
    return 0;
  };

  const convertProductIdToCartId = (cartItems: CartItems[], productId: number) => {
    if (cartItems) {
      const targetItem = cartItems.find((cartItem) => cartItem.product.id === productId);
      if (targetItem) {
        return targetItem.id;
      }
      return null;
    }
  };

  return { getQuantityInCart, convertProductIdToCartId };
};

export default useHandleCartItem;
