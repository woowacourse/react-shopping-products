import { IconCart, IconLogo } from '../../../asset';
import { HeaderStyle } from './Header.styles';

const Header = () => {
  return (
    <section css={HeaderStyle}>
      <a href="/">
        <img src={IconLogo} alt="logo" />
      </a>

      <a href="/cart">
        <img src={IconCart} alt="cart" />
      </a>
    </section>
  );
};

export default Header;
