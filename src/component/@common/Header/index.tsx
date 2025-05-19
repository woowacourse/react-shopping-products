import { IconCart, IconLogo } from '../../../asset';
import CardQuantity from '../CardQuantity';
import { CartStyle, HeaderStyle } from './Header.styles';

const Header = ({ count }: { count: number }) => {
  return (
    <section css={HeaderStyle}>
      <a href="/">
        <img src={IconLogo} alt="logo" />
      </a>

      <a href="/cart" css={CartStyle}>
        <img src={IconCart} alt="cart" />
        {count > 0 && <CardQuantity>{count}</CardQuantity>}
      </a>
    </section>
  );
};

export default Header;
