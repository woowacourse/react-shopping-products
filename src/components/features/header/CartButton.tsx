import styled from '@emotion/styled';

function CartButton({ itemsCount }) {
  return (
    <Container>
      <CartIcon src="./assets/icons/Cart.svg" />
      <ItemsCountBox>
        <ItemsCountText>{itemsCount}</ItemsCountText>
      </ItemsCountBox>
    </Container>
  );
}

const Container = styled.button`
  position: relative;
  width: 48px;
  height: 48px;
`;

const CartIcon = styled.img`
  width: 100%;
  height: 100%;
`;

const ItemsCountBox = styled.div`
  position: absolute;
  right: 0%;
  bottom: 0;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: white;
  color: black;
`;

const ItemsCountText = styled.p`
  font-size: 12px;
  font-weight: 700;
`;
export default CartButton;
