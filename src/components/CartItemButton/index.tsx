import { useCartItemContext } from "@/contexts/CartItemProvider";
import * as S from "./CartItemButton.styled";
import cartItemIcon from "@assets/icons/cart-item.svg";

function CartItemButton() {
  const { cartItems } = useCartItemContext();
  const cartItemQuantity = cartItems.length;

  return (
    <S.CartItemButton type="button">
      <img src={cartItemIcon} alt="장바구니" />
      {cartItemQuantity >= 1 && (
        <S.QuantityBox data-testid="cart-item-quantity">
          {cartItemQuantity}
        </S.QuantityBox>
      )}
    </S.CartItemButton>
  );
}

export default CartItemButton;
