import { useCallback } from 'react';
import { cartService } from '../../service/cart';
import { useToast } from '../../component/@common/Toast/context/toastContext';
import { CartItem } from '../../types/common';

type removeCartProps = {
  onSuccess: (value: CartItem[]) => void;
};

export const useRemoveCart = ({ onSuccess }: removeCartProps) => {
  const { openToast } = useToast();

  return useCallback(
    async (cartId: number) => {
      try {
        const response = await cartService.removeCartItem(cartId);

        onSuccess(response);
        openToast('상품이 장바구니에서 제거되었습니다.', true);
      } catch {
        openToast('장바구니 빼기에 실패했어요...', false);
      }
    },
    [onSuccess, openToast]
  );
};
