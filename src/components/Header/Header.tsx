import styled from "@emotion/styled";

import shoppingBag from "/shoppingBag.svg";

function Header() {
  return (
    <Container>
      <a href="./">
        <Title>SHOP</Title>
      </a>
      <Button>
        <Image src={shoppingBag} />
      </Button>
    </Container>
  );
}

export default Header;

const Container = styled.header`
  background-color: #000000;
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 24px;
  padding-right: 24px;

  a {
    text-decoration: none;
  }
`;

const Title = styled.p`
  font-weight: 800;
  font-size: 20px;
  color: #ffffff;
`;

const Button = styled.button`
  border: 0;
  background-color: transparent;
  cursor: pointer;
`;

const Image = styled.img`
  width: 20px;
  height: 24px;
`;
