import styled from '@emotion/styled';
import { useAPIDataContext } from '../../../context/APIDataProvider';
import { getShoppingCartData } from '../../../api/cart';
import { BasicModal } from '@dev-dino22/modal-components';
import CartDetails from '../cart-details/CartDetails';
import { useBoolean } from '../../../hooks/useBoolean';

function CartButton() {
  const { data: cartListData } = useAPIDataContext({
    fetcher: getShoppingCartData,
    name: 'cart',
  });
  const [isOpenCartModal, openCartModal, closeCartModal] = useBoolean(false);

  const itemsCount = cartListData?.length || 0;
  return (
    <>
      <Container
        onClick={openCartModal}
        role="cart-button"
        aria-label="장바구니 열기"
      >
        <CartIcon src="./assets/icons/Cart.svg" />
        {itemsCount > 0 && (
          <ItemsCountBox>
            <ItemsCountText aria-label="현재 장바구니 목록 수">
              {itemsCount}
            </ItemsCountText>
          </ItemsCountBox>
        )}
      </Container>{' '}
      {isOpenCartModal && (
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
