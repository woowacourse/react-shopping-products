import { useUpdateCartItemQuantityMutation } from "@/hooks/server/useCartItems";

const useUpdateItemQuantity = () => {
  const { mutate, isPending } = useUpdateCartItemQuantityMutation();

  const increaseQuantity = ({ cartId, itemQuantity }: { cartId: number; itemQuantity: number }) => {
    mutate({ cartId, quantity: itemQuantity + 1 });
  };

  const decreaseQuantity = ({ cartId, itemQuantity }: { cartId: number; itemQuantity: number }) => {
    mutate({ cartId, quantity: itemQuantity - 1 });
  };

  return {
    increaseQuantity,
    decreaseQuantity,
    isPending,
  };
};

export default useUpdateItemQuantity;
