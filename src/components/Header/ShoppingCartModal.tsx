import { css } from "@emotion/react";
import { Modal, Text } from "..";
import { CartItem } from "@/pages/products/components";
import { CartItemApi } from "@/apis";
import { useQuery } from "@/modules";
import * as S from "./ShoppingCartModal.styles";
export default function ShoppingCartModal() {
  const { data: cartItems, refetch: refetchCartItems } = useQuery({
    queryFn: CartItemApi.getCartItems,
    queryKey: "cartItems",
  });

  const totalPrice = cartItems?.content?.reduce((acc, item) => acc + item.product.price * item.quantity, 0) ?? 0;

  return (
    <Modal
      size="large"
      position="bottom"
      isBackdropClose
      css={css`
        max-width: 430px;
      `}
    >
      <Modal.Top>
        <Modal.Title>장바구니</Modal.Title>
      </Modal.Top>
      <Modal.Content>
        <S.CartItemWrapper>
          {cartItems?.content.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} refetchCartItems={refetchCartItems} />
          ))}
        </S.CartItemWrapper>

        <S.TotalPriceWrapper>
          <Text variant="title-2">총 결제 금액</Text>
          <Text variant="title-1">{totalPrice.toLocaleString()}원</Text>
        </S.TotalPriceWrapper>
      </Modal.Content>
      <Modal.Bottom>
        <Modal.ButtonContainer>
          <Modal.CancelButton
            css={css`
              background-color: #333;
              color: white;
              width: 100%;
              padding: 12px;
              text-align: center;
            `}
          >
            닫기
          </Modal.CancelButton>
        </Modal.ButtonContainer>
      </Modal.Bottom>
    </Modal>
  );
}
