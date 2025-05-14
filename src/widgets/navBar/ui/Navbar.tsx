import * as S from './Navbar.styles';
import {useNavigate} from 'react-router-dom';

export default function Navbar({cartQuantity}: {cartQuantity: number}) {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate(0);
  };

  return (
    <S.Wrapper>
      <S.Logo onClick={handleLogoClick}>SHOP</S.Logo>
      <S.CartIconContainer>
        <S.CartQuantity>{cartQuantity}</S.CartQuantity>
        <S.CartIcon src="/cartIcon.svg"></S.CartIcon>
      </S.CartIconContainer>
    </S.Wrapper>
  );
}
