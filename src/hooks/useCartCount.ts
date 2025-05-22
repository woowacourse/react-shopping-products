import type { ProductItemType } from '../types/data';

interface UseCartCountProps {
  cartInCount: number;
  product: ProductItemType;
  handleUpdateCartItems: (productId: number, quantity: number) => void;
  handleAddCartItems: (productId: number) => void;
  handleRemoveCartItems: (productId: number) => void;
}

const useCartCount = ({
  cartInCount,
  product,
  handleUpdateCartItems,
  handleAddCartItems,
  handleRemoveCartItems,
}: UseCartCountProps) => {
  const handlePlusCount = () => {
    const newCartInCount = cartInCount + 1;
    if (newCartInCount > product.quantity) return;
    if (cartInCount > 0) {
      handleUpdateCartItems(product.id, newCartInCount);
      return;
    }
    handleAddCartItems(product.id);
  };

  const handleMinusCount = () => {
    const newCartInCount = cartInCount - 1;
    if (cartInCount !== 1) {
      handleUpdateCartItems(product.id, newCartInCount);
      return;
    }
    handleRemoveCartItems(product.id);
  };

  return { handlePlusCount, handleMinusCount };
};

export default useCartCount;
