import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCartItem, getCartItems, addCartItem } from "../../api/cartItems";
import { CartItemType } from "../../types/cartItems";
import { ERROR_MESSAGE } from "../../constants/errorMessage/ko";

export interface ToggleCartItemReturns {
  cartItems: CartItemType[];
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  checkSelected: (id: number) => boolean;
  isLoading: boolean;
  error: unknown;
}

const useToggleCartItem = (): ToggleCartItemReturns => {
  const queryClient = useQueryClient();

  const {
    data: cartItems,
    isLoading,
    error,
  } = useQuery<CartItemType[]>({
    queryKey: ["cartItems"],
    queryFn: getCartItems,
  });

  const addMutation = useMutation({
    mutationFn: (productId: number) => addCartItem({ productId, quantity: 1 }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cartItems"] }),
  });

  const removeMutation = useMutation({
    mutationFn: (productId: number) => {
      const targetItem = cartItems?.find((item) => item.product.id === productId);
      if (targetItem) {
        return deleteCartItem(targetItem.id);
      }
      throw new Error(ERROR_MESSAGE.deleteCartItem);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cartItems"] }),
  });

  const addToCart = (productId: number) => {
    addMutation.mutate(productId);
  };

  const removeFromCart = (productId: number) => {
    removeMutation.mutate(productId);
  };

  const checkSelected = (id: number): boolean => {
    return !!cartItems?.find((item) => item.product.id === id);
  };

  return {
    cartItems: cartItems || [],
    addToCart,
    removeFromCart,
    checkSelected,
    isLoading: isLoading,
    error: error || addMutation.error || removeMutation.error,
  };
};

export default useToggleCartItem;
