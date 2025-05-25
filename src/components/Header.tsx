import { css } from "@emotion/react";
import ShoppingBag from "./icons/ShoppingBag";

import useCartItems from "../hooks/useCartItems";
import { useCartModal } from "../contexts/CartModalContext";

const Header = () => {
  const { cartItems } = useCartItems();
  const { handleCartModalOpen } = useCartModal();
  return (
    <header css={headerStyle}>
      <span>SHOP</span>
      <div css={shoppingBagStyle} onClick={handleCartModalOpen}>
        <ShoppingBag />
        {cartItems?.length !== 0 && <span css={shoppingBagCountStyle}>{cartItems?.length}</span>}
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
