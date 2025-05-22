import useModal from "../../hooks/useModal";
import * as S from "./ShopHeader.styles";
import Cart from "/cart.svg";

interface Props {
  cartItemCount: number;
}

const ShopHeader = ({ cartItemCount }: Props) => {
  const { openModal } = useModal();

  return (
    <S.Header>
      <S.Logo href="/">SHOP</S.Logo>
      <S.CartButton onClick={() => openModal("cart")}>
        <S.CartIcon src={Cart} alt="장바구니" />
        {!!cartItemCount && <S.CartItemCount>{cartItemCount}</S.CartItemCount>}
      </S.CartButton>
    </S.Header>
  );
};

export default ShopHeader;
