import { Link } from 'react-router-dom';
import MainLogo from '../../assets/MainLogo.svg';
import CartIcon from '../../assets/CartIcon.svg';
import * as S from './Header.style';

const Header = () => {
  return (
    <S.HeaderWrapper>
      <Link to="/">
        <img src={MainLogo} alt="메인 로고" />
      </Link>
      <S.CartIconWrapper>
        <img src={CartIcon} alt="장바구니 아이콘" />
        <S.CartNumber>1</S.CartNumber>
      </S.CartIconWrapper>
    </S.HeaderWrapper>
  );
};

export default Header;
