import { HeaderWrapper, CartWrapper, CartCountTextWrapper } from '../styles/Header';
import { IMAGE_PATH } from '../constants/imagePath';

type HeaderProps = {
  cartCount: number;
};

const Header = ({ cartCount }: HeaderProps) => {
  return (
    <HeaderWrapper>
      <img src={IMAGE_PATH.HEADER_TITLE} />
      <CartWrapper>
        {cartCount !== 0 && <CartCountTextWrapper>{cartCount}</CartCountTextWrapper>}
        <img src={IMAGE_PATH.SHOPPING_CART} alt="shopping_cart" />
      </CartWrapper>
    </HeaderWrapper>
  );
};

export default Header;
