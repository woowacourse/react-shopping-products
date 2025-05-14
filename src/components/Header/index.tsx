import { css } from "@emotion/css";

const Header = () => {
  return (
    <header className={HeaderStyles}>
      <a href="/" className={LogoStyles}>
        SHOP
      </a>
      <img src="/shopIcon.svg" alt="장바구니" className={IconStyles} />
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
