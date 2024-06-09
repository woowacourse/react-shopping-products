import { CartButtonProvider } from '../../../context/cartButton/CartButtonProvider';
import { useCartButtonContext } from '../../../context/cartButton/useCartButtonContext';
import { cartMutations } from '../../../hooks/queries/cart';

import { Suspense } from 'react';
import { LoadingSpinner } from '../../common/LoadingSpinner/style';
import QuantityButton from '../../common/QuantityButton';
import { AddCartIcon } from './Icons';
import * as S from './style';

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
  const { productId, isPushed } = useCartButtonContext();

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <S.ButtonContainer>
        {isPushed ? (
          <QuantityButton productId={productId} />
        ) : (
          <CartButton.Add />
        )}
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
