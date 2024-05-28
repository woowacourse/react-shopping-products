import Badge from '../common/Badge/Badge';
import { CartBadgeContainer } from './CartBadge.style';
import { PropsWithChildren } from 'react';

const CartBadge: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <CartBadgeContainer>
      <Badge bgColor="#fff" color="#000">
        2
      </Badge>
      {children}
    </CartBadgeContainer>
  );
};

export default CartBadge;
