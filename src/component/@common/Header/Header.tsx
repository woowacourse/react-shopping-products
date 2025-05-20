import { IconCart, IconLogo } from '../../../asset';
import { CartQuantityStyle, CartStyle, HeaderStyle } from './Header.styles';

const Header = ({ count }: { count: number }) => {
  return (
    <section css={HeaderStyle}>
      <a href="/">
        <img src={IconLogo} alt="logo" />
      </a>

      <a href="/cart" css={CartStyle}>
        <img src={IconCart} alt="cart" />
        {count > 0 && <div css={CartQuantityStyle}>{count}</div>}
      </a>
    </section>
  );
};

export default Header;
