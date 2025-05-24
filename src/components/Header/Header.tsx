import { useCartContext } from '../../contexts/CartContext';
import Button from '../common/Button/Button';
import { cartImg, count, headerContainer, headerTitle } from './Header.style';

function Header({ onClickCartIcon }: { onClickCartIcon: () => void }) {
  const { cartItemCount } = useCartContext();

  return (
    <div className={headerContainer}>
      <div className={headerTitle}>SHOP</div>
      <Button onClick={onClickCartIcon}>
        <img src="./images/cart.png" alt="cart" className={cartImg} />
        <span className={count}>{cartItemCount}</span>
      </Button>
    </div>
  );
}

export default Header;
