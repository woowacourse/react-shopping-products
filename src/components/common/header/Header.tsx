import * as Styled from './Header.styled';

import { IMAGES } from '@/assets';

interface HeaderProp {
  cartCount?: number;
}

const Header = ({ cartCount }: HeaderProp) => {
  return (
    <Styled.Header>
      <Styled.AppTitle onClick={() => scrollTo({ top: 0, left: 0, behavior: 'smooth' })}>
        SHOP
      </Styled.AppTitle>
      <div>
        {cartCount && <Styled.ShoppingCartCount>{cartCount}</Styled.ShoppingCartCount>}
        <img src={IMAGES.SHOPPING_CART} />
      </div>
    </Styled.Header>
  );
};

export default Header;
