import { IconCart, IconLogo } from '../../../asset';
import { CartQuantityStyle, CartStyle, HeaderStyle } from './Header.styles';
import { useContext } from 'react';
import CartContext from '../../../context/cartContext/cartContext';
import ModalContext from '../../../context/modalContext/modalContext';

const Header = () => {
  const { cartData } = useContext(CartContext);
  const { open } = useContext(ModalContext);

  return (
    <section css={HeaderStyle}>
      <a href="/">
        <img src={IconLogo} alt="logo" />
      </a>

      <div css={CartStyle} onClick={open}>
        <img src={IconCart} alt="cart" />
        {cartData.length > 0 && (
          <div css={CartQuantityStyle}>{cartData.length}</div>
        )}
      </div>
    </section>
  );
};

export default Header;
