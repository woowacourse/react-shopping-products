import { Modal } from "rian-modal-component";
import * as S from "@/pages/cartModal/style";
import useHandleCartItem from "@/hooks/useHandleCartItem";
import CartItem from "@/pages/cartModal/components/CartItem";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import TextBox from "@/components/_common/TextBox";

const CartModal = ({ onCloseModal }: { onCloseModal: () => void }) => {
  const { cartItems } = useHandleCartItem();

  return (
    <S.Wrapper>
      <Modal isOpen={true} position="bottom" onClose={onCloseModal}>
        <TextBox type="medium" text="장바구니" />
        <Modal.Content>
          <ItemWrapper>
            {cartItems?.map((item) => (
              <CartItem item={item} />
            ))}
          </ItemWrapper>
        </Modal.Content>
        <Modal.StyledButton
          backgroundColor={theme.COLOR["grey3"]}
          textColor="white"
          label="닫기"
          onClickEvent={onCloseModal}
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
