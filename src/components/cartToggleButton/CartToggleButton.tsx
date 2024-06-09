import * as Styled from './CartToggleButton.styled';

import { IMAGES } from '@/assets';
import { AdjustQuantityButton } from '../common/adjustQuantityButton/AdjustQuantityButton';
import { useToast } from '@/hooks/useToast';
import useCartItemList from '@/hooks/useCartItemList';

interface CartItemButtonProp {
  productId: number;
}

const CartToggleButton = ({ productId }: CartItemButtonProp) => {
  const { toastError } = useToast();
  const { cartItemList, addCartItemMutation, matchCartItem } = useCartItemList();

  return (
    <>
      {matchCartItem(productId) ? (
        <Styled.HandleCartItemButton $isInCart={true}>
          <AdjustQuantityButton productId={productId} />
        </Styled.HandleCartItemButton>
      ) : (
        <Styled.HandleCartItemButton
          $isInCart={false}
          onClick={() => {
            if (!cartItemList) return;
            if (cartItemList?.length >= 20) {
              toastError('장바구니에 더 이상 추가할 수 없습니다.');
              return;
            }
            addCartItemMutation(productId);
          }}
        >
          <img src={IMAGES.ADD_SHOPPING_CART} alt="장바구니에 담기버튼" />
          담기
        </Styled.HandleCartItemButton>
      )}
    </>
  );
};

export default CartToggleButton;
