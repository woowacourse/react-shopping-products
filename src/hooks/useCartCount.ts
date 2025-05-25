import type { ProductItemType } from '../types/data';

interface UseCartCountProps {
  cartInCount: number;
  product: ProductItemType;
  onUpdateCartItems: (productId: number, quantity: number) => void;
  onAddCartItems: (productId: number) => void;
  onRemoveCartItems: (productId: number) => void;
}

const useCartCount = ({
  cartInCount,
  product,
  onUpdateCartItems,
  onAddCartItems,
  onRemoveCartItems,
}: UseCartCountProps) => {
  const handlePlusCount = () => {
    const newCartInCount = cartInCount + 1;
    if (newCartInCount > product.quantity) return;
    if (cartInCount > 0) {
      onUpdateCartItems(product.id, newCartInCount);
      return;
    }
    onAddCartItems(product.id);
  };

  const handleMinusCount = () => {
    const newCartInCount = cartInCount - 1;
    if (cartInCount !== 1) {
      onUpdateCartItems(product.id, newCartInCount);
      return;
    }
    onRemoveCartItems(product.id);
  };

  return { handlePlusCount, handleMinusCount };
};

export default useCartCount;
