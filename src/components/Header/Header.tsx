import Button from '../common/Button/Button';
import useGetCarts from '../../hooks/useGetCartItems';
import { getImageUrl } from '../../utils/getImageUrl';
import { cartImg, count, headerContainer, headerTitle } from './Header.style';

interface HeaderProps {
  onCartClick: () => void;
}

function Header({ onCartClick }: HeaderProps) {
  const { carts } = useGetCarts();
  const itemCount = carts ? new Set(carts.map((cart) => cart.product.id)).size : 0;

  return (
    <div className={headerContainer}>
      <div className={headerTitle}>SHOP</div>
      <Button onClick={onCartClick}>
        <img src={getImageUrl('./images/cart.png')} alt="cart" className={cartImg} />
        <span className={count}>{itemCount}</span>
      </Button>
    </div>
  );
}

export default Header;
