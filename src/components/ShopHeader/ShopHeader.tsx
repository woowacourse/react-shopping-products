import * as S from "./ShopHeader.styles";
import Cart from "/cart.svg";

const ShopHeader = () => {
  return (
    <S.Header>
      <S.Logo href="/">SHOP</S.Logo>
      <S.CartImage src={Cart} alt="장바구니" />
    </S.Header>
  );
};

export default ShopHeader;
