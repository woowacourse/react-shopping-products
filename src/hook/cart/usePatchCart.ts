import { useCallback, useContext } from 'react';
import { useToast } from '../../component/@common/Toast/context/toastContext';
import { CartItem, Product } from '../../types/common';
import { cartService } from '../../service/cart';
import ShoppingItemContext from '../../context/shoppingItemContext/shoppingItemContext';

type patchCartProps = {
  onSuccess: (value: CartItem[]) => void;
};

const isMaxQuantity = (
  quantity: number,
  data: Product[],
  productId: number
) => {
  const productQuantity = data.find((item) => item.id === productId)?.quantity;

  if (!productQuantity) return false;

  return quantity > productQuantity;
};

export const usePatchCart = ({ onSuccess }: patchCartProps) => {
  const { openToast } = useToast();
  const { data } = useContext(ShoppingItemContext);

  return useCallback(
    async (cartId: number, quantity: number, productId: number) => {
      try {
        if (isMaxQuantity(quantity, data, productId)) {
          throw new Error('최대 수량에 도달했습니다.');
        }

        const response = await cartService.patchCartItemQuantity(
          cartId,
          quantity
        );

        onSuccess(response);
        openToast('장바구니 수량이 변경되었습니다.', true);
      } catch (error) {
        if (error instanceof Error) {
          openToast(error.message, false);
        } else {
          openToast('장바구니 수량 변경에 실패했어요...', false);
        }
      }
    },
    [openToast, data, onSuccess]
  );
};
