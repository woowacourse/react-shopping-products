import { useCart } from '../../context/CartContext';
import Badge from '../common/Badge/Badge';
import { CartBadgeContainer } from './CartBadge.style';
import { PropsWithChildren } from 'react';

const CartBadge: React.FC<PropsWithChildren> = ({ children }) => {
  const { cartItem } = useCart();

  return (
    <CartBadgeContainer>
      <Badge bgColor="#fff" color="#000">
        {cartItem.length}
      </Badge>
      {children}
    </CartBadgeContainer>
  );
};

export default CartBadge;
