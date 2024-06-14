import * as Styled from './Header.styled';

import { IMAGES } from '@/assets';

interface HeaderProp {
  cartCount?: number;
  openModal: () => void;
}

const Header = ({ cartCount, openModal }: HeaderProp) => {
  return (
    <Styled.Header>
      <Styled.AppTitle onClick={() => scrollTo({ top: 0, left: 0, behavior: 'smooth' })}>
        SHOP
      </Styled.AppTitle>
      <Styled.ShoppingCartButton onClick={() => openModal()}>
        {cartCount && <Styled.ShoppingCartCount>{cartCount}</Styled.ShoppingCartCount>}
        <img src={IMAGES.SHOPPING_CART} />
      </Styled.ShoppingCartButton>
    </Styled.Header>
  );
};

export default Header;
