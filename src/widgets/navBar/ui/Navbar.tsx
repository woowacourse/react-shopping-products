import * as S from './Navbar.styles';

export default function Navbar() {
  return (
    <S.Wrapper>
      <S.Logo>SHOP</S.Logo>
      <S.CartIcon src="/cartIcon.svg"></S.CartIcon>
    </S.Wrapper>
  );
}
