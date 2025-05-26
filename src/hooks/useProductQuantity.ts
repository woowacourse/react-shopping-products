import useGetCarts from './useGetCartItems';
import useCartManagement from './useCartManagement';

type UseProductQuantityProps = {
  id: number;
  quantity: number;
  isAdd: boolean;
};

function useProductQuantity({ id, quantity, isAdd }: UseProductQuantityProps) {
  const { carts, refetchCarts } = useGetCarts();
  const { handleAddCartItem, handleUpdateCartItem, handleDeleteCartItem } = useCartManagement({
    refetchCarts,
    carts,
  });

  const cartItem = carts?.find((cart) => cart.product.id === id);
  const selectedQuantity = cartItem ? cartItem.quantity : 1;
  const isOutOfStock = quantity === 0;

  const handleIncreaseQuantity = () => {
    if (selectedQuantity < quantity) {
      const newQuantity = selectedQuantity + 1;
      if (isAdd) {
        handleUpdateCartItem({ productId: id, quantity: newQuantity });
      }
    }
  };

  const handleDecreaseQuantity = () => {
    if (selectedQuantity === 1) {
      if (isAdd) {
        handleDeleteCartItem({ productId: id });
      }
      return;
    }

    if (selectedQuantity > 1) {
      const newQuantity = selectedQuantity - 1;
      if (isAdd) {
        handleUpdateCartItem({ productId: id, quantity: newQuantity });
      }
    }
  };

  const handleAddToCart = () => {
    handleAddCartItem({ productId: id, quantity: selectedQuantity });
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
