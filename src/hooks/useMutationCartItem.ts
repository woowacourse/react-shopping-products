import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCartItem, deleteCartItem, patchCartItemQuantity } from "@/api/cartItem";

const useMutationCartItem = () => {
  const queryClient = useQueryClient();

  const postCartItemMutation = useMutation({
    mutationFn: postCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },
  });

  const deleteCartItemMutation = useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },
  });

  const patchCartItemMutation = useMutation({
    mutationFn: patchCartItemQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },
  });

  const handleDeleteCartItem = (cartItemId: number) => {
    deleteCartItemMutation.mutate(cartItemId);
  };

  const handleChangeQuantity = (cartItemId: number, newQuantity: number) => {
    patchCartItemMutation.mutate({
      cartItemId: cartItemId,
      quantity: newQuantity,
    });
  };

  const handleClickAddCartItem = (productId: number) => {
    postCartItemMutation.mutate({ productId, quantity: 1 });
  };

  return {
    handleDeleteCartItem,
    handleClickAddCartItem,
    handleChangeQuantity,
  };
};

export default useMutationCartItem;
