import useGetCarts from './useGetCartItems';
import useAddCartItem from './useAddCartItem';
import useDeleteCartItem from './useDeleteCartItem';
import useUpdateCartItem from './useUpdateCartItem';

type UseProductQuantityProps = {
  id: number;
  quantity: number;
  isAdd: boolean;
};

function useProductQuantity({ id, quantity, isAdd }: UseProductQuantityProps) {
  const { carts, refetchCarts } = useGetCarts();
  const { handleAddCartItem } = useAddCartItem({
    refetchCarts,
    carts,
  });
  const { handleDeleteCartItem } = useDeleteCartItem({
    refetchCarts,
    carts,
  });
  const { handleUpdateCartItem } = useUpdateCartItem({
    refetchCarts,
    carts,
  });

  const cartItem = carts?.find((cart) => cart.product.id === id);
  const selectedQuantity = cartItem ? cartItem.quantity : 1;
  const isOutOfStock = quantity === 0;

  const handleIncreaseQuantity = async () => {
    if (selectedQuantity < quantity) {
      const newQuantity = selectedQuantity + 1;
      if (isAdd) {
        await handleUpdateCartItem({ productId: id, quantity: newQuantity });
      }
    }
  };

  const handleDecreaseQuantity = async () => {
    if (selectedQuantity === 1) {
      if (isAdd) {
        await handleDeleteCartItem({ productId: id });
      }
      return;
    }

    if (selectedQuantity > 1) {
      const newQuantity = selectedQuantity - 1;
      if (isAdd) {
        await handleUpdateCartItem({ productId: id, quantity: newQuantity });
      }
    }
  };

  const handleAddToCart = async () => {
    await handleAddCartItem({ productId: id, quantity: selectedQuantity });
  };

  return {
    selectedQuantity,
    isOutOfStock,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleAddToCart,
  };
}

export default useProductQuantity;
