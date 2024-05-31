import { useCart } from '../../hooks/useCart';
import Badge from '../common/Badge/Badge';
import { CartBadgeContainer } from './CartBadge.style';
import { PropsWithChildren } from 'react';

const CartBadge: React.FC<PropsWithChildren> = ({ children }) => {
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
