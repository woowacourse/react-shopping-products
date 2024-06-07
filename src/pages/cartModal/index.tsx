import { Modal } from "rian-modal-component";
import * as S from "@/pages/cartModal/style";
import CartItem from "@/pages/cartModal/components/CartItem";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import TextBox from "@/components/_common/TextBox";
import { CartItems } from "@/types/products";

const CartModal = ({
  onCloseModal,
  cartItems,
}: {
  onCloseModal: () => void;
  cartItems: CartItems[];
  isOpenModal: boolean;
}) => {
  const isEmptyCart = !cartItems.length;

  return (
    <S.Wrapper>
      <Modal isOpen={true} position="bottom" onClose={onCloseModal}>
        <TextBox type="medium" text="장바구니" />
        <Modal.Content>
          <ItemWrapper>
            {isEmptyCart ? (
              <div>장바구니가 비어있습니다.</div>
            ) : (
              cartItems?.map((item) => <CartItem item={item} cartItems={cartItems} />)
            )}
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
