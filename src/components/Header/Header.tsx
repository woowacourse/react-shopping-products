import * as Styled from "./Header.styled";

import shoppingBag from "/shoppingBag.svg";

function Header() {
  return (
    <Styled.Container>
      <a href="./">
        <Styled.Title>SHOP</Styled.Title>
      </a>
      <Styled.Button>
        <Styled.Image src={shoppingBag} />
      </Styled.Button>
    </Styled.Container>
  );
}

export default Header;
