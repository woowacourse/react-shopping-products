import Button from '../common/Button/Button';
import useGetCarts from '../../hooks/useGetCartItems';
import { cartImg, count, headerContainer, headerTitle } from './Header.style';

function Header() {
  const { carts } = useGetCarts();
  const itemCount = carts ? new Set(carts.map((cart) => cart.product.id)).size : 0;

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
