import * as S from "./ShopHeader.styles";
import Cart from "/cart.svg";

interface ShopHeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

const ShopHeader = ({ cartItemCount, onCartClick }: ShopHeaderProps) => {
  return (
    <S.Header>
      <S.Logo href="/">SHOP</S.Logo>
      <S.CartImage src={Cart} alt="장바구니" onClick={onCartClick} />
      {!!cartItemCount && (
        <S.CartItemCount data-testid="cart-item-count" onClick={onCartClick}>
          {cartItemCount}
        </S.CartItemCount>
      )}
    </S.Header>
  );
};

export default ShopHeader;
