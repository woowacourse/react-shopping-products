import * as S from './style';
import CartIcon from '../../../assets/images/cartIcon.png';
import Logo from '../../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const moveToHome = () => {
    navigate(0);
  };

  const moveToCartPage = () => {
    navigate(0);
  };

  return (
    <S.Container>
      <button onClick={moveToHome}>
        <S.Logo src={Logo} alt="SHOP 로고" />
      </button>
      <button onClick={moveToCartPage}>
        <S.CartIcon src={CartIcon} alt="장바구니 버튼" />
      </button>
    </S.Container>
  );
}
