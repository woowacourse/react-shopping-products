import { Modal } from "rian-modal-component";
import * as S from "@/pages/cartModal/style";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import TextBox from "@/components/_common/TextBox";
import { CartItems } from "@/types/products";
import EmptyState from "@/components/_common/EmptyState";
import CartPrice from "@/components/cart/CartPrice";
import CartItemMemo from "@/components/cart/CartItem";

const CartModal = ({
  onCloseModal,
  cartItems,
}: {
  onCloseModal: () => void;
  cartItems: CartItems[];
  isOpenModal: boolean;
}) => {
  const isEmptyCart = !cartItems.length;

  console.log("cartItems", cartItems);

  return (
    <S.Wrapper>
      <Modal isOpen={true} position="bottom" onClose={onCloseModal}>
        <TextBox type="medium" text="장바구니" style={{ paddingBottom: 10 }} />
        <Modal.Content>
          <ItemWrapper>
            {isEmptyCart ? (
              <EmptyState type="cart" />
            ) : (
              <>{cartItems && cartItems?.map((item) => <CartItemMemo item={item} cartItems={cartItems} />)}</>
            )}
          </ItemWrapper>
        </Modal.Content>
        {!isEmptyCart && <CartPrice cartItems={cartItems} />}
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
  min-height: 250px;
`;
