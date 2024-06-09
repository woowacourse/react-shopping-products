import { useState } from 'react';

import { MainLogo, ShoppingCartIcon } from '../../assets';
import CartItemModal from '../CartItemModal/CartItemModal';
import useCartItemList from '../../hooks/useCartItemList';

import * as S from './Header.style';

function Header() {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const handleModalOpen = () => {
    setIsModalOpened(true);
  };
  const handleModalClose = () => {
    setIsModalOpened(false);
  };

  const { data, error, isFetching } = useCartItemList();
  const quantity = data?.content.length ?? 0;

  return (
    <S.HeaderBackground>
      <CartItemModal isOpened={isModalOpened} onClose={handleModalClose} />
      <S.HeaderWrapper>
        <MainLogo />
        <S.ShoppingCartButton onClick={handleModalOpen}>
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
