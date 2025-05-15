import Button from '../common/Button/Button';
import { cartImg, count, headerContainer, headerTitle } from './Header.style';

function Header({ itemCount }: { itemCount: number }) {
  return (
    <div className={headerContainer}>
      <div className={headerTitle}>SHOP</div>
      <Button>
        <img src="./images/cart.png" alt="cart" className={cartImg} />
        <span className={count}>{itemCount}</span>
      </Button>
    </div>
  );
}

export default Header;
