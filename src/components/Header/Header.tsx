import { useContext } from "react";
import { MainLogo, ShoppingCartIcon } from "../../assets";
import * as S from "./Header.style";
import { QuantityContext } from "../../store/QuantityContext";

function Header() {
  const quantityContext = useContext(QuantityContext);
  const quantity = quantityContext ? quantityContext.quantity : 0;

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
