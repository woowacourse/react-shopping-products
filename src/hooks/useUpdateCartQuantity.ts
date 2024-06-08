import { useUpdateCartItemQuantityMutation } from "@/hooks/server/useCartItems";

const useUpdateItemQuantity = () => {
  const updateCartItemQuantityMutation = useUpdateCartItemQuantityMutation();

  const increaseQuantity = ({ cartId, itemQuantity }: { cartId: number; itemQuantity: number }) => {
    updateCartItemQuantityMutation.mutate({ cartId, quantity: itemQuantity + 1 });
  };

  const decreaseQuantity = ({ cartId, itemQuantity }: { cartId: number; itemQuantity: number }) => {
    updateCartItemQuantityMutation.mutate({ cartId, quantity: itemQuantity - 1 });
  };

  return {
    increaseQuantity,
    decreaseQuantity,
  };
};

export default useUpdateItemQuantity;
