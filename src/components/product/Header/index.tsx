import CartIcon from '../../../assets/images/cartIcon.png';
import Logo from '../../../assets/images/logo.png';
import CartModal from '../../cart/CartModal';

import { useNavigate } from 'react-router-dom';
import { useModal } from 'llqqssttyy-react-modules-components';
import { cartQueries } from '../../../hooks/queries/cart';

import * as S from './style';

export default function Header() {
  return (
    <S.Container>
      <HomeButton />
      <CartButton />
    </S.Container>
  );
}

function HomeButton() {
  const navigate = useNavigate();
  const moveToHome = () => {
    navigate(0);
  };

  return (
    <S.Button onClick={moveToHome} type="button">
      <S.Logo src={Logo} alt="SHOP 로고" />
    </S.Button>
  );
}

function CartButton() {
  const { openModal: openCartModal, closeModal, isModalOpen } = useModal(false);
  const { data: cartItems } = cartQueries.useGetCartItems();

  return (
    <>
      <S.Button onClick={openCartModal} type="button">
        <S.CartIcon src={CartIcon} alt="장바구니 버튼" />
        <S.CartItemQuantity>{cartItems.length}</S.CartItemQuantity>
      </S.Button>

      <CartModal isModalOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
}
