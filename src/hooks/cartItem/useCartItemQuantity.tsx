import { useQueryClient } from '@tanstack/react-query';
import useCartItemList from './useCartItemList';
import {
  useAddCartItemMutation,
  useDeleteCartItemMutation,
  useModifyCartItemQuantityMutation,
} from '@/apis/queries/cartItem';

const UNIT_COUNT = 1;

type UseCartItemQuantityProps = {
  onAddCartItemError: (error: Error) => void;
  onDeleteCartItemError: (error: Error) => void;
  onModifyCartItemQuantityError: (error: Error) => void;
};

const useCartItemQuantity = ({
  onAddCartItemError,
  onDeleteCartItemError,
  onModifyCartItemQuantityError,
}: UseCartItemQuantityProps) => {
  const queryClient = useQueryClient();
  const { getCartItemQuantity, getCartItemId } = useCartItemList();

  const addCartItemMutation = useAddCartItemMutation(queryClient, onAddCartItemError);
  const modifyCartItemQuantity = useModifyCartItemQuantityMutation(
    queryClient,
    onModifyCartItemQuantityError,
  );
  const deleteCartItemMutation = useDeleteCartItemMutation(queryClient, onDeleteCartItemError);

  const deleteCartItem = async (productId: number) => {
    const cartItemId = getCartItemId(productId);
    await deleteCartItemMutation.mutateAsync(cartItemId);
  };

  const increaseCartItemQuantity = async (productId: number) => {
    const updatedQuantity = getCartItemQuantity(productId) + UNIT_COUNT;
    const cartItemId = getCartItemId(productId);
    await modifyCartItemQuantity.mutateAsync({ cartItemId, quantity: updatedQuantity });
  };

  const decreaseCartItemQuantity = async (productId: number) => {
    const updatedQuantity = getCartItemQuantity(productId) - UNIT_COUNT;
    const cartItemId = getCartItemId(productId);
    await modifyCartItemQuantity.mutateAsync({ cartItemId, quantity: updatedQuantity });
  };

  return {
    decreaseCartItemQuantity,
    increaseCartItemQuantity,
    addCartItem: addCartItemMutation.mutateAsync,
    deleteCartItem,
  };
};

export default useCartItemQuantity;
