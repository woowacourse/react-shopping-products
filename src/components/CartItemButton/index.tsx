import * as S from "./CartItemButton.styled";
import cartItemIcon from "@assets/icons/cart-item.svg";

interface CartItemButtonProps {
  quantity: number;
}

function CartItemButton({ quantity }: CartItemButtonProps) {
  return (
    <S.CardItemButton type="button">
      <img src={cartItemIcon} alt="장바구니" />
      {quantity >= 1 && (
        <S.QuantityBox data-testid="cart-item-quantity">
          {quantity}
        </S.QuantityBox>
      )}
    </S.CardItemButton>
  );
}

export default CartItemButton;
