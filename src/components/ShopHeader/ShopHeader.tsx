import * as S from "./ShopHeader.styles";
import Cart from "/cart.svg";

const ShopHeader = ({ cartItemCount }: { cartItemCount: number }) => {
  return (
    <S.Header>
      <S.Logo href="/">SHOP</S.Logo>
      <S.CartImage src={Cart} alt="장바구니" />
      {!!cartItemCount && <S.CartItemCount>{cartItemCount}</S.CartItemCount>}
    </S.Header>
  );
};

export default ShopHeader;
