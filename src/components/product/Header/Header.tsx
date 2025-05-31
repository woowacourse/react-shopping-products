import * as Styled from "./Header.styled";

import shoppingBag from "/shoppingBag.svg";

import { useState } from "react";
import { Modal } from "../../common/Modal";
import ShoppingCartList from "../ShoppingCartList/ShoppingCartList";

import useShoppingCartData from "../../../hooks/shoppingCart/useShoppingCartData";

function Header() {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const { cartItems } = useShoppingCartData();

  return (
    <Styled.Container>
      <a href="./">
        <Styled.Title>SHOP</Styled.Title>
      </a>

      <Styled.ButtonWrapper>
        <Styled.Button onClick={handleOpenModal}>
          <Styled.Image src={shoppingBag} />
          <Styled.ShoppingBag>{cartItems.length}</Styled.ShoppingBag>
        </Styled.Button>
      </Styled.ButtonWrapper>
      <Modal isOpen={openModal} onClose={handleCloseModal}>
        <Modal.Container position="bottom">
          <Modal.Title title="장바구니" />
          <ShoppingCartList handleCloseModal={handleCloseModal} />
        </Modal.Container>
      </Modal>
    </Styled.Container>
  );
}

export default Header;
