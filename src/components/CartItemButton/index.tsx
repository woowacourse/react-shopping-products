import { useCartItemContext } from "@/contexts/CartItemProvider";
import * as S from "./CartItemButton.styled";
import cartItemIcon from "@assets/icons/cart-item.svg";
import { useState } from "react";
import CartItemBottomSheet from "../CartItemBottomSheet";

function CartItemButton() {
  const { cartItems } = useCartItemContext();
  const cartItemQuantity = cartItems.length;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <S.CartItemButton type="button" onClick={() => setIsOpen(true)}>
        <img src={cartItemIcon} alt="장바구니" />
        {cartItemQuantity >= 1 && (
          <S.QuantityBox data-testid="cart-item-quantity">
            {cartItemQuantity}
          </S.QuantityBox>
        )}
      </S.CartItemButton>
      {isOpen && (
        <CartItemBottomSheet
          cartItems={cartItems}
          onRequestClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export default CartItemButton;
