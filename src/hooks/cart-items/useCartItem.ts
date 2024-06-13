import useCartQuery from "./useCartQuery";

export default function useCartItem() {
  const { data, error, isLoading } = useCartQuery();

  const cartItemLength = data?.length;

  const totalPrice = data?.reduce(
    (accPrice, currCartItem) => accPrice + currCartItem.product.price * currCartItem.quantity,
    0,
  );

  const checkIsInCart = (productId: number) => {
    if (!data) return false;

    return data.some((cartItem) => cartItem.product.id === productId);
  };

  const getCartItem = (productId: number) => {
    return data?.find((cartItem) => cartItem.product.id === productId);
  };

  return {
    cartItems: data ?? [],
    error,
    isLoading,
    cartItemLength,
    totalPrice,
    checkIsInCart,
    getCartItem,
  };
}
