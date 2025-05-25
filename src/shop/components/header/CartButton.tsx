import styled from '@emotion/styled';
import { useAPIDataContext } from '../../../context/APIDataProvider';
import { getShoppingCartData } from '../../../api/cart';
import { useState } from 'react';
import { BasicModal } from '@dev-dino22/modal-components';
import CartDetails from '../cart-details/CartDetails';

function CartButton() {
  const { data: cartListData } = useAPIDataContext({
    fetcher: getShoppingCartData,
    name: 'cart',
  });
  const [isOpened, setIsOpened] = useState(false);

  const openCartModal = () => {
    setIsOpened(true);
  };

  const closeCartModal = () => {
    setIsOpened(false);
  };
  const itemsCount = cartListData?.length || 0;
  return (
    <>
      <Container data-testid="cart-button" onClick={openCartModal}>
        <CartIcon src="./assets/icons/Cart.svg" />
        {itemsCount > 0 && (
          <ItemsCountBox>
            <ItemsCountText data-testid="cart-count">
              {itemsCount}
            </ItemsCountText>
          </ItemsCountBox>
        )}
      </Container>{' '}
      {isOpened && (
        <BasicModal
          titleText="장바구니"
          modalPosition="bottom"
          onClose={closeCartModal}
          closeType="none"
        >
          <CartDetails onCloseClick={closeCartModal} />
        </BasicModal>
      )}
    </>
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
