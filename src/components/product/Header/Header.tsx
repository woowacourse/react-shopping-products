import * as Styled from "./Header.styled";

import shoppingBag from "/shoppingBag.svg";
import { CartItem } from "../../../types/FetchCartItemsResult";

interface HeaderProps {
  cartItems: CartItem[];
}

function Header({ cartItems }: HeaderProps) {
  return (
    <Styled.Container>
      <a href="./">
        <Styled.Title>SHOP</Styled.Title>
      </a>
      <Styled.ButtonWrapper>
        <Styled.Button>
          <Styled.Image src={shoppingBag} />
        </Styled.Button>
        <Styled.ShoppingBag>{cartItems.length}</Styled.ShoppingBag>
      </Styled.ButtonWrapper>
    </Styled.Container>
  );
}

export default Header;
