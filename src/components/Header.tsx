import { HeaderWrapper, CartWrapper, CartCountTextWrapper } from '../styles/Header';
import { IMAGE_PATH } from '../constants/imagePath';
import { useFetchCartItems } from '../hooks/useFetchCartItems';
import { useModalContext } from 'oa-modal-components';

const Header = () => {
  const { data: cartProductsIds } = useFetchCartItems();
  const cartCount = cartProductsIds.length;

  const { openModalHandler } = useModalContext();

  return (
    <HeaderWrapper>
      <img src={IMAGE_PATH.HEADER_TITLE} />
      <CartWrapper onClick={openModalHandler}>
        {cartCount !== 0 && <CartCountTextWrapper>{cartCount}</CartCountTextWrapper>}
        <img src={IMAGE_PATH.SHOPPING_CART} alt="shopping_cart" />
      </CartWrapper>
    </HeaderWrapper>
  );
};

export default Header;
