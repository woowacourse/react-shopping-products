import { deleteCartItem, postCartItem } from '../api/cartItem';
import { CartItem } from '../page/ShopPage';

interface UseCartItemToggleParams {
  productId: number;
  selectedCartItem?: CartItem;
  onSuccess?: () => void;
}

export function useCartItemToggle({ productId, selectedCartItem, onSuccess }: UseCartItemToggleParams) {
  const isSelected = !!selectedCartItem;

  const toggle = async () => {
    if (isSelected) {
      await deleteCartItem({ id: Number(selectedCartItem!.id) });
    } else {
      await postCartItem({ productId, quantity: 1 });
    }

    onSuccess?.();
  };

  return { isSelected, toggle };
}
