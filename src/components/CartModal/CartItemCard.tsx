import React from 'react';
import useFetchCart from '../../hooks/useFetchCart';
import { CartItem } from '../../types/fetch';
import * as S2 from '../common/Stepper/RoundButton.styled';
import Stepper from '../common/Stepper/Stepper';
import useCartStepper from '../common/Stepper/useCartStepper';
import * as S from './CartItemCard.styled';

interface CartItemProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  cartItem: CartItem;
}

const CartItemCard = ({ cartItem, style, ...props }: CartItemProps) => {
  const { handleClickDecrease, handleClickIncrease, isMinusButtonActive } = useCartStepper(cartItem, 1, false);
  const { deleteToRemoveCart } = useFetchCart();

  return (
    <div style={style} {...props}>
      <S.ItemWrapper>
        <S.ItemImage src={cartItem.product.imageUrl} />
        <S.DetailWrapper>
          <S.upperDetailWrapper>
            <S.NamePriceWrapper>
              <S.ProductName>{cartItem.product.name}</S.ProductName>
              <S.ProductPrice>{cartItem.product.price.toLocaleString() + '원'}</S.ProductPrice>
            </S.NamePriceWrapper>
            <S2.RoundButton
              width={40}
              height={24}
              $isActive={true}
              onClick={() => {
                deleteToRemoveCart(cartItem.id);
              }}
            >
              삭제
            </S2.RoundButton>
          </S.upperDetailWrapper>
          <Stepper.Horizontal style={{ justifyContent: 'flex-start' }}>
            <Stepper.MinusButton onClick={handleClickDecrease} $isActive={isMinusButtonActive} />
            <Stepper.DisplayCounter count={cartItem.quantity} />
            <Stepper.PlusButton onClick={handleClickIncrease} />
          </Stepper.Horizontal>
        </S.DetailWrapper>
      </S.ItemWrapper>
    </div>
  );
};

export default CartItemCard;
