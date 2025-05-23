import { IconCart, IconLogo } from '../../../asset';
import { CartQuantityStyle, CartStyle, HeaderStyle } from './Header.styles';
import { useContext } from 'react';
import CartContext from '../../../context/cartContext/cartContext';

const Header = () => {
  const { cartData } = useContext(CartContext);

  return (
    <section css={HeaderStyle}>
      <a href="/">
        <img src={IconLogo} alt="logo" />
      </a>

      <a href="/cart" css={CartStyle}>
        <img src={IconCart} alt="cart" />
        {cartData.length > 0 && (
          <div css={CartQuantityStyle}>{cartData.length}</div>
        )}
      </a>
    </section>
  );
};

export default Header;
