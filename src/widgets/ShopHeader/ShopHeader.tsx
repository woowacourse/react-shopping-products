import { BASE_URL } from "../../app/config/base";
import { useCart } from "../../features/cart/hooks/useCart";
import useModal from "../../shared/hooks/useModal";
import CartModal from "../CartModal/CartModal";
import * as S from "./ShopHeader.styles";
import Cart from "/cart.svg";

const ShopHeader = () => {
  const { cartItemsCount } = useCart();
  const { openModal } = useModal();

  const handleOpenCart = () => openModal(<CartModal />);

  return (
    <S.ShopHeader>
      <S.Logo href={BASE_URL}>SHOP</S.Logo>
      <S.CartButton onClick={handleOpenCart}>
        <S.CartIcon src={Cart} alt="cart" />
        {!!cartItemsCount && (
          <S.CartItemsCount>{cartItemsCount}</S.CartItemsCount>
        )}
      </S.CartButton>
    </S.ShopHeader>
  );
};

export default ShopHeader;
