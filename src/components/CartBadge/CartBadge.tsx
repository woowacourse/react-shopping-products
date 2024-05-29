import { useCart } from '../../context/ShoppingCartCountContext';
import Badge from '../common/Badge/Badge';
import { CartBadgeContainer } from './CartBadge.style';
import { PropsWithChildren } from 'react';

const CartBadge: React.FC<PropsWithChildren> = ({ children }) => {
  // const [counts, setCounts] = useState<number>(0);
  const { counts } = useCart();

  return (
    <CartBadgeContainer>
      <Badge bgColor="#fff" color="#000">
        {counts}
      </Badge>
      {children}
    </CartBadgeContainer>
  );
};

export default CartBadge;
