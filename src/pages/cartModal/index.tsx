import { Modal } from "rian-modal-component";
import * as S from "@/pages/cartModal/style";
import useHandleCartItem from "@/hooks/useHandleCartItem";
import CartItem from "@/components/CartItem";
import styled from "styled-components";
import { useState } from "react";
import { theme } from "@/styles/theme";

const CartModal = () => {
  const { cartItems } = useHandleCartItem();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <S.Wrapper>
      <Modal isOpen={true} position="bottom" onClose={() => {}}>
        <Modal.Title>장바구니</Modal.Title>
        <Modal.Content>
          <ItemWrapper>
            {cartItems?.map((cart) => (
              <CartItem item={cart} />
            ))}
          </ItemWrapper>
        </Modal.Content>
        <Modal.StyledButton
          backgroundColor={theme.COLOR["grey3"]}
          textColor="white"
          label="닫기"
          onClickEvent={() => {
            setIsModalOpen(false);
          }}
        />
      </Modal>
    </S.Wrapper>
  );
};

export default CartModal;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 400px;
  overflow-y: scroll;
  width: 100%;
`;
