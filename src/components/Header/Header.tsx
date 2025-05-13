import BagIcon from '../Icon/BagIcon';
import * as S from './Header.styled';
function Header() {
  return (
    <S.HeaderContainer>
      <S.HeaderTitle>SHOP</S.HeaderTitle>
      <BagIcon />
    </S.HeaderContainer>
  );
}

export default Header;
