import useUpdateCartItemQuantity from '@/queries/cartItem/useUpdateCartItemQuantity';

import { MinusButton, PlusButton } from '@/components/button/QuantityButton';
import Toast from '@/components/Toast';

import { PatchCartItemQuantityProps } from '@/api/cartItem';

import styled from '@emotion/styled';

const CartItemQuantityContainer = ({
  cartItemId,
  quantity,
}: PatchCartItemQuantityProps) => {
  const { updateQuantity, error } = useUpdateCartItemQuantity();

  return (
    <S.QuantityContainer>
      <MinusButton
        quantity={quantity}
        onClick={() => updateQuantity({ cartItemId, quantity: quantity - 1 })}
      />
      <span>{quantity}</span>
      <PlusButton
        quantity={quantity}
        onClick={() => updateQuantity({ cartItemId, quantity: quantity + 1 })}
      />
      {error && <Toast message={error.message} />}
    </S.QuantityContainer>
  );
};

export default CartItemQuantityContainer;

const S = {
  QuantityContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80px;
  `,
};
