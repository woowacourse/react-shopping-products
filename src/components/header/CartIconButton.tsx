import styled from '@emotion/styled';

type CartIconButtonProps = {
  cartItemCount: number;
  onClickCartIconButton: () => void;
};

const CartIconButton = ({
  cartItemCount,
  onClickCartIconButton,
}: CartIconButtonProps) => {
  const labelText =
    cartItemCount === 0
      ? '장바구니 버튼, 비어 있음'
      : `장바구니 버튼, ${cartItemCount}개 담김`;

  return (
    <CartIconButtonContainer
      aria-label={labelText}
      onClick={onClickCartIconButton}
    >
      <img src="/cartIcon.svg" />
      {cartItemCount !== 0 && (
        <CartItemCount data-testid="cart-item-count">
          {cartItemCount}
        </CartItemCount>
      )}
    </CartIconButtonContainer>
  );
};

export default CartIconButton;

const CartIconButtonContainer = styled.button`
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
`;

const CartItemCount = styled.div`
  width: 19px;
  height: 19px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: -5px;
  right: -6px;
  background-color: white;
  color: black;
  border-radius: 50%;
  font-size: 14px;
  font-weight: 700;
`;
