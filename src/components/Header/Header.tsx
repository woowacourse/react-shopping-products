import * as S from "./Header.styles";
import Cart from "/cart.svg";

const Header = () => {
  return (
    <S.Header>
      <S.Logo href="/">SHOP</S.Logo>
      <S.CartImage src={Cart} alt="장바구니" />
    </S.Header>
  );
};

export default Header;
