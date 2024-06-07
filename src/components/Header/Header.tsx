import { MainLogo, ShoppingCartIcon } from "../../assets";
import * as S from "./Header.style";
import useCartItem from "../../hooks/useCartItem";

function Header() {
  const { fetchCartItemList } = useCartItem();
  const quantity = fetchCartItemList.data?.content.length;

  return (
    <S.HeaderBackground>
      <S.HeaderWrapper>
        <S.MainLogo src={MainLogo} alt="메인 로고" />
        <S.ShoppingCartButton>
          <S.ShoppingCartIconContainer
            src={ShoppingCartIcon}
          ></S.ShoppingCartIconContainer>
          {quantity && (
            <S.ShoppingCartQuantityContainer>
              <S.ShoppingCartQuantity>{quantity}</S.ShoppingCartQuantity>
            </S.ShoppingCartQuantityContainer>
          )}
        </S.ShoppingCartButton>
      </S.HeaderWrapper>
    </S.HeaderBackground>
  );
}

export default Header;
