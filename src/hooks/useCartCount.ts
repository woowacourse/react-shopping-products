import type { ProductItemType } from '../types/data';

interface UseCartCountProps {
  cartInCount: number;
  product: ProductItemType;
  onUpdateCartItem: (productId: number, quantity: number) => void;
  onAddCartItem: (productId: number) => void;
  onRemoveCartItem: (productId: number) => void;
}

const useCartCount = ({
  cartInCount,
  product,
  onUpdateCartItem,
  onAddCartItem,
  onRemoveCartItem,
}: UseCartCountProps) => {
  const handlePlusCount = () => {
    const newCartInCount = cartInCount + 1;
    if (newCartInCount > product.quantity) return;
    if (cartInCount > 0) {
      onUpdateCartItem(product.id, newCartInCount);
      return;
    }
    onAddCartItem(product.id);
  };

  const handleMinusCount = () => {
    const newCartInCount = cartInCount - 1;
    if (cartInCount !== 1) {
      onUpdateCartItem(product.id, newCartInCount);
      return;
    }
    onRemoveCartItem(product.id);
  };

  return { handlePlusCount, handleMinusCount };
};

export default useCartCount;
