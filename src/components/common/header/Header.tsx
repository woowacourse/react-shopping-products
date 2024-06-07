import { useState } from 'react';

import * as Styled from './Header.styled';
import ShoppingCartModal from './ShoppingCartModal';

import { IMAGES } from '@/assets';

import useCartItems from '@/hooks/useCartItems';

const Header = () => {
  const { cartItems } = useCartItems();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClickLogo = () => scrollTo({ top: 0, left: 0, behavior: 'smooth' });

  return (
    <Styled.Header>
      <Styled.AppTitle onClick={handleClickLogo}>SHOP</Styled.AppTitle>
      <button onClick={handleOpen}>
        <Styled.ShoppingCartCount>{cartItems.length}</Styled.ShoppingCartCount>
        <img src={IMAGES.SHOPPING_CART} />
      </button>
      <ShoppingCartModal isOpen={isOpen} onClose={handleClose} cartItems={cartItems} />
    </Styled.Header>
  );
};

export default Header;
