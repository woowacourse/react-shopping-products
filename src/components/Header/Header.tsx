import Button from '../common/Button/Button';
import { css } from '@emotion/css';

const headerContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 64px;
  background-color: #000000;
  padding: 0px 20px;
`;

const headerTitle = css`
  color: #ffffff;
  font-size: 20px;
  font-weight: 800;
  line-height: 16px;
`;

const cartImg = css`
  width: 20px;
  height: 24px;
`;

function Header() {
  return (
    <div className={headerContainer}>
      <div className={headerTitle}>SHOP</div>
      <Button>
        <img src="/images/cart.png" alt="cart" className={cartImg} />
      </Button>
    </div>
  );
}

export default Header;
