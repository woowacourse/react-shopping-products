import { useCallback, useContext } from 'react';
import { cartService } from '../../service/cart';
import { useToast } from '../../component/@common/Toast/context/toastContext';
import { CartItem, Product } from '../../types/common';
import ShoppingItemContext from '../../context/shoppingItemContext/shoppingItemContext';

type addCartProps = {
  onSuccess: (value: CartItem[]) => void;
};

const isSoldOut = (productId: number, data: Product[]) => {
  return data?.find((item) => item.id === productId)?.quantity === 0;
};

export const useAddCart = ({ onSuccess }: addCartProps) => {
  const { openToast } = useToast();
  const { data } = useContext(ShoppingItemContext);

  return useCallback(
    async (productId: number) => {
      try {
        if (isSoldOut(productId, data)) {
          throw new Error('상품의 재고가 없습니다.');
        }

        const response = await cartService.addCartItem(productId);

        onSuccess(response);
        openToast('상품이 장바구니에 추가되었습니다.', true);
      } catch (error) {
        if (error instanceof Error) {
          openToast(error.message, false);
        } else {
          openToast('장바구니 담기에 실패했어요...', false);
        }
      }
    },
    [onSuccess, openToast, data]
  );
};
