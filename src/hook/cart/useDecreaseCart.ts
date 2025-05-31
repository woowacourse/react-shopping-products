import { useCallback } from 'react';
import { useToast } from '../../component/@common/Toast/context/toastContext';
import { CartItem } from '../../types/common';
import { cartService } from '../../service/cart';

type decreaseCartProps = {
  onSuccess: (value: CartItem[]) => void;
};

export const useDecreaseCart = ({ onSuccess }: decreaseCartProps) => {
  const { openToast } = useToast();

  return useCallback(
    async (cartId: number, quantity: number) => {
      try {
        const response = await cartService.patchCartItemQuantity(
          cartId,
          quantity
        );

        onSuccess(response);
        openToast('장바구니 수량이 감소되었습니다.', true);
      } catch (error) {
        if (error instanceof Error) {
          openToast(error.message, false);
        } else {
          openToast('장바구니 수량 감소에 실패했어요...', false);
        }
      }
    },
    [openToast, onSuccess]
  );
};
