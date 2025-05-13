import { css } from "@emotion/react";
import ShoppingBag from "./icons/ShoppingBag";

const Header = () => {
  return (
    <header css={headerStyle}>
      <span>SHOP</span>
      <div css={shoppingBagStyle}>
        <ShoppingBag />
        <div>
          <span>3</span>
        </div>
      </div>
    </header>
  );
};

export default Header;

const headerStyle = css`
  width: 100%;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #000;
  color: white;
`;

const shoppingBagStyle = css`
  position: relative;
`;
