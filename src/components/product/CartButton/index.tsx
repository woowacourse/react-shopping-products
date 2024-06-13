import { cartMutations, cartQueries } from '../../../hooks/queries/cart';
import { EllipsisLoader } from '../../common/LoadingSpinner/style';

import QuantityButton from '../../common/QuantityButton';
import { AddCartIcon } from './Icons';
import * as S from './style';

export interface CartButtonProps {
  productId: number;
}

export default function CartButton({ productId }: CartButtonProps) {
  const { data: cartItems } = cartQueries.useGetCartItems();

  const isPushed = cartItems.some(
    (cartItem) => cartItem.product.id === productId
  );

  return (
    <S.ButtonContainer>
      {isPushed ? (
        <QuantityButton productId={productId} />
      ) : (
        <CartButton.Add productId={productId} />
      )}
    </S.ButtonContainer>
  );
}

CartButton.Add = function Add({ productId }: { productId: number }) {
  const { mutate: addCartItem, isPending } = cartMutations.useAddCartItem({
    productId,
  });

  const handleClick = () => {
    addCartItem();
  };

  if (isPending) {
    return (
      <S.Button>
        <EllipsisLoader style={{ top: '-11px' }} />
      </S.Button>
    );
  }

  return (
    <S.Button isPushed={false} onClick={handleClick}>
      <AddCartIcon />
      <p>담기</p>
    </S.Button>
  );
};
