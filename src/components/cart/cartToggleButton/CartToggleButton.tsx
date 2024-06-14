import * as Styled from './CartToggleButton.styled';

import { IMAGES } from '@/assets';
import { AdjustQuantityButton } from '../../common/adjustQuantityButton/AdjustQuantityButton';
import { CartItemInfo } from '@/types/cartItem';

interface CartItemButtonProp {
  productId: number;
  cartItemList?: CartItemInfo[];
  handleAddCartItem: (productId: number) => void;
  handleAdjustQuantity: (quantity: number, cartItemId: number) => void;
  matchCartItem: (productId: number) => CartItemInfo | undefined;
}

const CartToggleButton = ({
  productId,
  cartItemList,
  handleAddCartItem,
  handleAdjustQuantity,
  matchCartItem,
}: CartItemButtonProp) => {
  return (
    <>
      {matchCartItem(productId) ? (
        <Styled.HandleCartItemButton $isInCart={true}>
          <AdjustQuantityButton
            matchCartItem={matchCartItem}
            productId={productId}
            handleAdjustQuantity={handleAdjustQuantity}
          />
        </Styled.HandleCartItemButton>
      ) : (
        <Styled.HandleCartItemButton
          $isInCart={false}
          onClick={() => {
            if (!cartItemList) return alert('해당 제품은 없는 제품 입니다.');
            handleAddCartItem(productId);
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
