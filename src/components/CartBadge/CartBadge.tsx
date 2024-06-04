import useCartListContext from '@/hooks/useCartListContext';
import Badge from '../common/Badge/Badge';
import { CartBadgeContainer } from './CartBadge.style';
import { PropsWithChildren } from 'react';

const CartBadge: React.FC<PropsWithChildren> = ({ children }) => {
  const { cartListQuantity } = useCartListContext();

  return (
    <CartBadgeContainer>
      {cartListQuantity !== 0 && (
        <Badge bgColor="#fff" color="#000">
          {cartListQuantity}
        </Badge>
      )}
      {children}
    </CartBadgeContainer>
  );
};

export default CartBadge;
