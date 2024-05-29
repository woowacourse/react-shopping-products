import { MainLogo, ShoppingCartIcon } from "../../assets";
import useCartItemList from "../../hooks/useCartItemList";
import * as S from "./Header.style";

function Header() {
  const { quantity } = useCartItemList();
  return (
    <S.HeaderBackground>
    <S.HeaderWrapper>
      <S.MainLogo src={MainLogo} alt="메인 로고" />
      <S.ShoppingCartButton>
        <S.ShoppingCartIconContainer
          src={ShoppingCartIcon}
        ></S.ShoppingCartIconContainer>
        {/* {quantity > 0 && ( */}
        <S.ShoppingCartQuantityContainer>
          <S.ShoppingCartQuantity>{quantity}</S.ShoppingCartQuantity>
        </S.ShoppingCartQuantityContainer>
        {/* )} */}
      </S.ShoppingCartButton>
    </S.HeaderWrapper>
    </S.HeaderBackground>
  );
}

export default Header;
