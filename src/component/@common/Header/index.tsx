import { IconCart, IconLogo } from '../../../asset';
import { HeaderStyle } from './Header.styles';

import { css } from '@emotion/react';

const CartQuantityStyle = css`
  position: absolute;
  top: 70%;
  right: 0;
  transform: translateY(-50%);
  width: 1.9rem;
  height: 1.9rem;
  border-radius: 50%;
  background-color: #fff;
  color: #000;
  font-size: 1rem;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardQuantity = ({ children }: { children: React.ReactNode }) => {
  return <div css={CartQuantityStyle}>{children}</div>;
};

const CartStyle = css`
  position: relative;
`;

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
