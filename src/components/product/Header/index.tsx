import { useNavigate } from 'react-router-dom';
import CartIcon from '../../../assets/images/cartIcon.png';
import Logo from '../../../assets/images/logo.png';
import * as S from './style';
import { cartQueries } from '../../../hooks/queries/cart';

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
  const navigate = useNavigate();
  const moveToCartPage = () => {
    navigate(0);
  };

  const { data: cartItems } = cartQueries.useGetCartItems();

  return (
    <S.Button onClick={moveToCartPage} type="button">
      <S.CartIcon src={CartIcon} alt="장바구니 버튼" />
      <S.CartItemQuantity>{cartItems.length}</S.CartItemQuantity>
    </S.Button>
  );
}
