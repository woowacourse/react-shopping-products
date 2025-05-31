import { css } from "@emotion/css";
import { CartItem } from "../../types/product.type";

interface HeaderProps {
  onCartClick: () => void;
  cartItems: CartItem[];
}
const Header = ({ onCartClick, cartItems }: HeaderProps) => {
  return (
    <header className={HeaderStyles}>
      <a href="/" className={LogoStyles}>
        SHOP
      </a>
      <section className={ShoppingCartSection} onClick={onCartClick}>
        <img src="./shopIcon.svg" alt="장바구니" className={IconStyles} />
        {cartItems.length > 0 && (
          <div className={ShoppingCartCount} data-testid="shopping-cart-count">
            {cartItems.length}
          </div>
        )}
      </section>
    </header>
  );
};

export default Header;

const HeaderStyles = css`
  position: fixed;
  top: 0;
  background-color: black;
  width: 430px;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  z-index: 1000;
`;

const LogoStyles = css`
  font-size: 20px;
  font-weight: 800;
  color: white;
  text-decoration: none;
`;

const IconStyles = css`
  width: 32px;
  height: 32px;
  color: white;
  cursor: pointer;
`;

const ShoppingCartCount = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 32px;
  right: 24px;
  width: 18px;
  height: 18px;
  background-color: white;
  border-radius: 50%;
  color: black;
  font-size: 12px;
  font-weight: 800;
`;

const ShoppingCartSection = css`
  cursor: pointer;
`;
