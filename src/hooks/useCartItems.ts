import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCartItems, addCartItem, removeCartItem, patchCartItem } from "../api/cart";
import { QUERY_KEYS } from "../constants/queryKeys";

interface UseCartItemsResult {
  cartItems: Cart[];
  // cartItemsCount: number;
  isLoading: boolean;
  error: unknown;
  handleAddCartItem: (id: number) => void;
  handleRemoveCartItem: (id: number) => void;
  handlePatchCartItem: (id: number, newQuantity: number) => void;
  isProductInCart: (id: number) => boolean;
}

const useCartItems = (): UseCartItemsResult => {
  const queryClient = useQueryClient();

  const {
    data: cartItems = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.CART],
    queryFn: getCartItems,
  });

  const addMutation = useMutation({
    mutationFn: addCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (id: number) => {
      const cartItem = cartItems.find((item) => item.product.id === id);
      return cartItem ? removeCartItem(cartItem.id) : Promise.reject("Item not found");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART] });
    },
  });

  const patchMutation = useMutation({
    mutationFn: ({ id, newQuantity }: { id: number; newQuantity: number }) => {
      const cartItem = cartItems.find((item) => item.product.id === id);
      return cartItem ? patchCartItem(cartItem.id, newQuantity) : Promise.reject("Item not found");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART] });
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
    // cartItemsCount: cartItems.length,
    isLoading,
    error,
    handleAddCartItem,
    handleRemoveCartItem,
    handlePatchCartItem,
    isProductInCart,
  };
};

export default useCartItems;
