import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCartItem, deleteCartItem, patchCartItemQuantity } from "@/api/cartItem";

const useMutationCartItem = () => {
  const queryClient = useQueryClient();

  const postCartItemMutation = useMutation({
    mutationFn: postCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems", "products"] });
    },
  });

  const deleteCartItemMutation = useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems", "products"] });
    },
  });

  const patchCartItemMutation = useMutation({
    mutationFn: patchCartItemQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { postCartItemMutation, deleteCartItemMutation, patchCartItemMutation };
};

export default useMutationCartItem;
