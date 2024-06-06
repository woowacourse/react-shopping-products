import { Modal } from "rian-modal-component";
import * as S from "@/pages/cartModal/style";
import CartItem from "@/pages/cartModal/components/CartItem";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import TextBox from "@/components/_common/TextBox";
import { useEffect } from "react";
import { CartItems } from "@/types/products";

const CartModal = ({ onCloseModal, cartItems }: { onCloseModal: () => void; cartItems: CartItems[] }) => {
  useEffect(() => {
    blockBackScroll();
  }, []);

  const blockBackScroll = () => {
    document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  };

  return (
    <S.Wrapper>
      <Modal isOpen={true} position="bottom" onClose={onCloseModal}>
        <TextBox type="medium" text="장바구니" />
        <Modal.Content>
          <ItemWrapper>
            {cartItems?.map((item) => (
              <CartItem item={item} cartItems={cartItems} />
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
