import * as Styled from "./Header.styled";

import shoppingBag from "/shoppingBag.svg";
import { CartItem } from "../../../types/FetchCartItemsResult";
import { useState } from "react";
import { Modal } from "../../common/Modal";
import ShoppingCartList from "../ShoppingCartList/ShoppingCartList";

interface HeaderProps {
  cartItems: CartItem[];
  handleRemoveProduct: (productId: number) => void;
  handleIncreaseCartItemQuantity: (productId: number) => void;
  handleDecreaseCartItemQuantity: (productId: number) => void;
}

function Header({
  cartItems,
  handleRemoveProduct,
  handleIncreaseCartItemQuantity,
  handleDecreaseCartItemQuantity,
}: HeaderProps) {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

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
          <ShoppingCartList
            cartItems={cartItems}
            handleCloseModal={handleCloseModal}
            handleRemoveProduct={handleRemoveProduct}
            handleIncreaseCartItemQuantity={handleIncreaseCartItemQuantity}
            handleDecreaseCartItemQuantity={handleDecreaseCartItemQuantity}
          />
        </Modal.Container>
      </Modal>
    </Styled.Container>
  );
}

export default Header;
