import { addCartItem, patchCartItem, removeCartItem } from "../api/cart";
import useCartMutation from "./useCartMutation";
import useGetCartItems from "./useGetCartItems";

interface UseCartItemsResult {
  cartItems: Cart[];
  isLoading: boolean;
  error: unknown;
  handleAddCartItem: (id: number) => void;
  handleRemoveCartItem: (id: number) => void;
  handlePatchCartItem: (id: number, newQuantity: number) => void;
  isProductInCart: (id: number) => boolean;
}

const useCartItems = (): UseCartItemsResult => {
  const { data: cartItems = [], isLoading, error } = useGetCartItems();
  const addMutation = useCartMutation<number>({ mutationFn: addCartItem });
  const removeMutation = useCartMutation<number>({
    mutationFn: (id: number) => {
      const cartItem = cartItems.find((item) => item.product.id === id);
      return cartItem ? removeCartItem(cartItem.id) : Promise.reject("Item not found");
    },
  });

  const patchMutation = useCartMutation<{ id: number; newQuantity: number }>({
    mutationFn: ({ id, newQuantity }: { id: number; newQuantity: number }) => {
      const cartItem = cartItems.find((item) => item.product.id === id);
      return cartItem ? patchCartItem(cartItem.id, newQuantity) : Promise.reject("Item not found");
    },
  });

  const handleAddCartItem = (id: number) => {
    addMutation.mutate(id);
  };

  const handleRemoveCartItem = (id: number) => {
    removeMutation.mutate(id);
  };

  const handlePatchCartItem = (id: number, newQuantity: number) => {
    patchMutation.mutate({ id, newQuantity });
  };

  const isProductInCart = (productId: number) => {
    return cartItems.some((cartItem) => cartItem.product.id === productId);
  };

  return {
    cartItems,
    isLoading,
    error,
    handleAddCartItem,
    handleRemoveCartItem,
    handlePatchCartItem,
    isProductInCart,
  };
};

export default useCartItems;
