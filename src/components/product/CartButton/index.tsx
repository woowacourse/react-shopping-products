import { CartButtonProvider } from '../../../context/cartButton/CartButtonProvider';
import { useCartButtonContext } from '../../../context/cartButton/useCartButtonContext';
import { cartMutations } from '../../../hooks/queries/cart';

import MinusIcon from '../../../assets/images/minusIcon.png';
import PlusIcon from '../../../assets/images/plusIcon.png';

import useQuantityControls from '../../../hooks/useQuantityControls';
import { BorderButton } from '../../common/BorderButton/style';
import { AddCartIcon } from './Icons';
import * as S from './style';
import { Suspense } from 'react';
import { LoadingSpinner } from '../../common/LoadingSpinner/style';

export interface CartButtonProps {
  productId: number;
}

export default function CartButton({ productId }: CartButtonProps) {
  return (
    <CartButtonProvider productId={productId}>
      <CartButton.Toggle />
    </CartButtonProvider>
  );
}

CartButton.Toggle = function Toggle() {
  const { isPushed } = useCartButtonContext();

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <S.ButtonContainer>
        {isPushed ? <CartButton.QuantityButton /> : <CartButton.Add />}
      </S.ButtonContainer>
    </Suspense>
  );
};

CartButton.Add = function Add() {
  const { productId } = useCartButtonContext();

  const { mutate: addCartItem } = cartMutations.useAddCartItem({
    productId,
  });

  const handleClick = () => {
    addCartItem();
  };

  return (
    <S.Button isPushed={false} onClick={handleClick}>
      <AddCartIcon />
      <p>담기</p>
    </S.Button>
  );
};

CartButton.QuantityButton = function QuantityButton() {
  const { productId } = useCartButtonContext();
  const { quantity, increase, decrease } = useQuantityControls(productId);

  return (
    <S.QuantityControls>
      <BorderButton onClick={decrease} size="small">
        <img src={MinusIcon} alt="감소 버튼 아이콘" />
      </BorderButton>

      <S.Quantity>{quantity}</S.Quantity>

      <BorderButton onClick={increase} size="small">
        <img src={PlusIcon} alt="증가 버튼 아이콘" />
      </BorderButton>
    </S.QuantityControls>
  );
};
