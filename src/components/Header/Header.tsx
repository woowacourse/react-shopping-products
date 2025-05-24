import { Modal } from "@kaori-killer/modal-component";

import useCartItemsId from "../../hooks/useCartItemsId";

import * as Styled from "./Header.styled";

import shoppingBag from "/shoppingBag.svg";
import CartModal from "../CartModal/CartModal";

function Header() {
  const { cartItemsId } = useCartItemsId();
  const { isOpen, handleOpen, handleClose } = Modal.useModal();

  return (
    <Styled.Container>
      <a href="./">
        <Styled.Title>SHOP</Styled.Title>
      </a>
      <Styled.ButtonWrapper>
        <Styled.Button>
          <Styled.Image src={shoppingBag} />
        </Styled.Button>
        <Styled.ShoppingBag onClick={handleOpen}>
          {cartItemsId.length}
        </Styled.ShoppingBag>
        <CartModal isOpen={isOpen} handleClose={handleClose} />
      </Styled.ButtonWrapper>
    </Styled.Container>
  );
}

export default Header;
