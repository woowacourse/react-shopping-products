import { MainLogo, ShoppingCartIcon } from '../../assets';

import * as S from './Header.style';

function Header() {
  const quantity = 0;

  return (
    <S.HeaderBackground>
      <S.HeaderWrapper>
        <MainLogo />
        <S.ShoppingCartButton>
          <ShoppingCartIcon />
          {(quantity ?? 0) > 0 && (
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
