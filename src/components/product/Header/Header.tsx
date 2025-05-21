import * as Styled from "./Header.styled";

import shoppingBag from "/shoppingBag.svg";

interface HeaderProps {
  selectedProductIdList: string[];
}

function Header({ selectedProductIdList }: HeaderProps) {
  return (
    <Styled.Container>
      <a href="./">
        <Styled.Title>SHOP</Styled.Title>
      </a>
      <Styled.ButtonWrapper>
        <Styled.Button>
          <Styled.Image src={shoppingBag} />
        </Styled.Button>
        <Styled.ShoppingBag>{selectedProductIdList.length}</Styled.ShoppingBag>
      </Styled.ButtonWrapper>
    </Styled.Container>
  );
}

export default Header;
