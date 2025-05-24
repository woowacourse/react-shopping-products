import { css } from "@emotion/css";
import { useAPIContext } from "../../contexts/APIProvider/useAPIContext";
import getShoppingCart from "../../APIs/shoppingCart/getShoppingCart";
import ErrorToast from "../ErrorToast";

interface HeaderProps {
  onCartClick: () => void;
}
const Header = ({ onCartClick }: HeaderProps) => {
  const { data, error } = useAPIContext({
    name: "cartItems",
    fetcher: () => getShoppingCart({ endpoint: "/cart-items" }),
  });

  return (
    <header className={HeaderStyles}>
      <a href="/" className={LogoStyles}>
        SHOP
      </a>
      <img
        src="./shopIcon.svg"
        alt="장바구니"
        className={IconStyles}
        onClick={onCartClick}
      />
      {Array.isArray(data) && data.length > 0 && (
        <div className={ShoppingCartCount}>{data.length}</div>
      )}
      {error.isError && <ErrorToast errorMessage={error.errorMessage} />}
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
