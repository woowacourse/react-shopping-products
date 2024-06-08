import * as Styled from './Header.styled';
import ShoppingCartModal from '../ShoppingCartModal';

import { IMAGES } from '@/assets';

import useCartItems from '@/hooks/useCartItems';
import useModal from '@/hooks/useModal';

const Header = () => {
  const { cartItems } = useCartItems();
  const { isOpen, handleOpen, handleClose } = useModal();

  const handleClickLogo = () => {
    scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <Styled.Header>
      <Styled.AppTitle onClick={handleClickLogo}>SHOP</Styled.AppTitle>
      <button onClick={handleOpen}>
        <Styled.ShoppingCartCount>{cartItems.length}</Styled.ShoppingCartCount>
        <img src={IMAGES.SHOPPING_CART} alt="장바구니" />
      </button>
      <ShoppingCartModal isOpen={isOpen} onClose={handleClose} cartItems={cartItems} />
    </Styled.Header>
  );
};

export default Header;
