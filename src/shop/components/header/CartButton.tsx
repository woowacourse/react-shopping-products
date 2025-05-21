import styled from '@emotion/styled';
import { useAPIDataContext } from '../../../context/APIDataProvider';
import { getShoppingCartData } from '../../../api/cart';

function CartButton() {
  const { data: cartListData } = useAPIDataContext({
    fetcher: getShoppingCartData,
    name: 'cart',
  });
  const itemsCount = cartListData?.length || 0;
  return (
    <Container data-testid="cart-button">
      <CartIcon src="./assets/icons/Cart.svg" />
      {itemsCount > 0 && (
        <ItemsCountBox>
          <ItemsCountText>{itemsCount}</ItemsCountText>
        </ItemsCountBox>
      )}
    </Container>
  );
}

const Container = styled.button`
  position: relative;
  width: 44px;
  height: 44px;
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
