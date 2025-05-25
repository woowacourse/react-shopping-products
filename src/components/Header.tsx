import { HeaderWrapper, CartWrapper, CartCountTextWrapper } from '../styles/Header';
import { IMAGE_PATH } from '../constants/imagePath';
import { useFetchCartItems } from '../hooks/useFetchCartItems';

const Header = () => {
  const { data: cartProductsIds } = useFetchCartItems();
  const cartCount = cartProductsIds.length;

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
