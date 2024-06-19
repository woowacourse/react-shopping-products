import { HTMLAttributes, RefObject, MouseEvent } from "react";
import {
  Wrapper,
  CartContent,
  CartTitle,
  CartProductList,
  CartPrice,
  CartPriceDescription,
  CartPriceNumber,
} from "./Cart.style";
import { Button, CartProduct } from "@/components";
import { CartItem } from "@/types";
import { calculatePaymentPrice } from "@/utils/product";

interface CartProps extends HTMLAttributes<HTMLDialogElement> {
  dialogRef: RefObject<HTMLDialogElement>;
  cartItems?: CartItem[];
}

const Cart = ({ cartItems, dialogRef, ...props }: CartProps) => {
  const handleClickDialog = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      dialogRef.current?.close();
      document.body.style.overflow = `auto`;
    }
  };

  const handleClickCloseButton = () => {
    dialogRef.current?.close();
    document.body.style.overflow = `auto`;
  };

  return (
    <Wrapper ref={ dialogRef } { ...props } onClick={ handleClickDialog }>
      <CartContent>
        <CartTitle style={ { marginBottom: "24px" } }>장바구니</CartTitle>
        <CartProductList>
          { cartItems?.map((cartItem) => (
            <CartProduct key={ cartItem.id } cartItem={ cartItem } />
          )) }
        </CartProductList>
        <CartPrice style={ { marginTop: "12px", marginBottom: "24px" } }>
          <CartPriceDescription>총 결제 금액</CartPriceDescription>
          <CartPriceNumber>{ `${calculatePaymentPrice(
            cartItems || []
          ).toLocaleString()}원` }</CartPriceNumber>
        </CartPrice>
        <Button theme="black" style={ { height: "44px" } } onClick={ handleClickCloseButton }>
          닫기
        </Button>
      </CartContent>
    </Wrapper>
  );
};

export default Cart;
