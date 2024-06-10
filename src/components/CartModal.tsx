import { Button, CustomModal } from "hain-tain-components";
import { useEffect, useState } from "react";

import COLOR_PALETTE from "../style/colorPalette";
import { CartItem } from "../types/cartItems";
import CartItemCard from "./cartItem/CartItemCard";
import styled from "@emotion/styled";

interface Props {
  cartItems: CartItem[];
  isCartOpen: boolean;
  toggleCart: () => void;
}

const CartModal = ({ isCartOpen, toggleCart, cartItems }: Props) => {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const totalPrice = cartItems?.reduce((accPrice, curItem) => {
      accPrice += curItem.product.price * curItem.quantity;
      return accPrice;
    }, 0);

    setTotalPrice(totalPrice);
  }, [cartItems]);

  return (
    <CustomModal
      isOpened={isCartOpen}
      closeModal={toggleCart}
      modalPosition="bottom"
    >
      <CustomModal.Header>
        <CustomModal.Title>장바구니</CustomModal.Title>
      </CustomModal.Header>
      <CustomModal.Body>
        {cartItems?.length ? (
          cartItems?.map((item) => <CartItemCard key={item.id} item={item} />)
        ) : (
          <S.Description>장바구니가 비었습니다.</S.Description>
        )}
      </CustomModal.Body>
      <CustomModal.Footer>
        <S.FlexColumn>
          <S.FlexBetween>
            <S.PriceLabel>총 결제 금액</S.PriceLabel>
            <S.TotalPrice>{totalPrice?.toLocaleString("ko-KR")}원</S.TotalPrice>
          </S.FlexBetween>
          <Button text="닫기" width="full" onClick={toggleCart} />
        </S.FlexColumn>
      </CustomModal.Footer>
    </CustomModal>
  );
};

export default CartModal;

const S = {
  Description: styled.p`
    font-size: 15px;
    margin: 20px 0;
    color: ${COLOR_PALETTE.grey};
  `,

  FlexColumn: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
  `,

  FlexBetween: styled.div`
    display: flex;
    justify-content: space-between;
  `,

  PriceLabel: styled.span`
    font-size: 16px;
    font-weight: 700;
    line-height: 16px;
    text-align: left;
  `,

  TotalPrice: styled.span`
    font-size: 24px;
    font-weight: 700;
    line-height: 34.75px;
    text-align: right;
  `,
};
