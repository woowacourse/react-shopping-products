import { CartItemApi } from "@/apis";
import { ShoppingBag } from "@/components/icons";
import useQuery from "@/modules/Query/useQuery/useQuery";
import { CartItem } from "@/pages/products/components";
import { css } from "@emotion/react";
import Modal from "../Modal/Modal";
import Text from "../Text/Text";
import * as S from "./Header.styles";

export default function Header() {
  const { data: cartItems } = useQuery({
    queryFn: CartItemApi.getCartItems,
    queryKey: "cartItems",
  });

  const shoppingCount = cartItems?.content?.length ?? 0;

  const handleShoppingBagClick = () => {};

  return (
    <S.HeaderWrapper>
      <span>SHOP</span>
      <Modal.Wrapper initialOpen>
        <Modal.Trigger>
          <S.ShoppingBagWrapper onClick={handleShoppingBagClick}>
            <ShoppingBag />
            {shoppingCount !== 0 && <S.ShoppingBagCount>{shoppingCount}</S.ShoppingBagCount>}
          </S.ShoppingBagWrapper>
        </Modal.Trigger>

        <ShoppingCartModal />
      </Modal.Wrapper>
    </S.HeaderWrapper>
  );
}

function ShoppingCartModal() {
  const { data: cartItems } = useQuery({
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
          {cartItems?.content.map((cartItem) => <CartItem key={cartItem.id} cartItem={cartItem} />)}
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
