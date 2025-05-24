import { css } from "@emotion/react";
import ShoppingBag from "./icons/ShoppingBag";

interface HeaderProps {
  shoppingCount?: number;
  handleCartClick: () => void;
}

const Header = ({ shoppingCount = 0, handleCartClick }: HeaderProps) => {
  return (
    <header css={headerStyle}>
      <span>SHOP</span>
      <div css={shoppingBagStyle} onClick={handleCartClick}>
        <ShoppingBag />
        {shoppingCount !== 0 && <span css={shoppingBagCountStyle}>{shoppingCount}</span>}
      </div>
    </header>
  );
};

export default Header;

const headerStyle = css`
  width: 100%;
  position: relative;
  z-index: 9;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #000;
  color: white;
`;

const shoppingBagStyle = css`
  position: relative;
  cursor: pointer;
`;

const shoppingBagCountStyle = css`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: #fff;
  border-radius: 50%;
  color: #000;
`;
