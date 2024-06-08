import { HTMLAttributes, RefObject, MouseEvent } from "react";
import {
  Wrapper,
  CartContent,
  CartTitle,
  CartProductList,
  CartProduct,
  CartPrice,
  CartPriceDescription,
  CartPriceNumber,
  CartProductImg,
  CartProductInfo,
  CartProductName,
  CartProductPrice,
} from "./Cart.style";
import { Button, ProductQuantity } from "@/components";
import { CartItem } from "@/types";

interface CartProps extends HTMLAttributes<HTMLDialogElement> {
  dialogRef: RefObject<HTMLDialogElement>;
  cartItems?: CartItem[];
}

const Cart = ({ cartItems, dialogRef, ...rest }: CartProps) => {
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
    <Wrapper ref={dialogRef} {...rest} onClick={handleClickDialog}>
      <CartContent>
        <CartTitle style={{ marginBottom: "24px" }}>장바구니</CartTitle>
        <CartProductList>
          {cartItems?.map((cartItem) => (
            <CartProduct key={cartItem.id}>
              <CartProductImg src={cartItem.product.imageUrl} />
              <CartProductInfo>
                <CartProductName>{cartItem.product.name}</CartProductName>
                <CartProductPrice>{cartItem.product.price}</CartProductPrice>
                <ProductQuantity cartItemId={cartItem.id} quantity={cartItem.quantity} />
                <Button
                  theme="white"
                  style={{
                    width: "40px",
                    height: "24px",
                    fontSize: "12px",
                    position: "absolute",
                    top: 0,
                    right: 0,
                  }}
                >
                  닫기
                </Button>
              </CartProductInfo>
            </CartProduct>
          ))}
        </CartProductList>
        <CartPrice style={{ marginTop: "12px", marginBottom: "24px" }}>
          <CartPriceDescription>총 결제 금액</CartPriceDescription>
          <CartPriceNumber>95,000원</CartPriceNumber>
        </CartPrice>
        <Button theme="black" style={{ height: "44px" }} onClick={handleClickCloseButton}>
          닫기
        </Button>
      </CartContent>
    </Wrapper>
  );
};

export default Cart;
