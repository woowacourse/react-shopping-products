/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseMutationResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCartItems, addCartItem } from "../../api/cartItems";
import { CartItemType } from "../../types/cartItems";
import { useDeleteCartItemByProductId } from "../useDeleteCartItem";
import QUERY_KEYS from "../../constants/queryKeys";

export interface ToggleCartItemReturns {
  cartItems: CartItemType[];
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  checkSelected: (id: number) => boolean;
  removeMutation: UseMutationResult<any, Error, number, unknown>;
  addMutation: UseMutationResult<any, Error, number, unknown>;
  isLoading: boolean;
  queryError: unknown;
}

const useToggleCartItem = (): ToggleCartItemReturns => {
  const queryClient = useQueryClient();

  const {
    data: cartItems,
    isLoading,
    error,
  } = useQuery<CartItemType[]>({
    queryKey: [QUERY_KEYS.cartItem],
    queryFn: getCartItems,
    staleTime: 30 * 1000,
  });

  const addMutation = useMutation({
    mutationFn: (productId: number) => addCartItem({ productId, quantity: 1 }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cartItem] }),
  });

  const removeMutation = useDeleteCartItemByProductId();

  const addToCart = (productId: number) => {
    addMutation.mutate(productId);
  };

  const removeFromCart = (productId: number) => {
    removeMutation.mutate(productId);
  };

  const checkSelected = (id: number): boolean => !!cartItems?.find((item) => item.product.id === id);

  return {
    cartItems: cartItems || [],
    addToCart,
    removeFromCart,
    checkSelected,
    isLoading,
    removeMutation,
    addMutation,
    queryError: error,
  };
};

export default useToggleCartItem;
