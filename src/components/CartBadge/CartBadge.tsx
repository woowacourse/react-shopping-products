import { CartBadgeContainer } from './CartBadge.style';
import { PropsWithChildren } from 'react';
import { useCartItemTotalQuantity } from '@/hooks/index';
import { Badge } from '@/components/index';

const CartBadge: React.FC<PropsWithChildren> = ({ children }) => {
  const { totalQuantity, isLoading, isError } = useCartItemTotalQuantity();

  if (isLoading) {
    return (
      <CartBadgeContainer>
        {
          <Badge bgColor="#fff" color="#000">
            0
          </Badge>
        }
        {children}
      </CartBadgeContainer>
    );
  }

  return (
    <CartBadgeContainer>
      {totalQuantity !== 0 && !isLoading && !isError && (
        <Badge bgColor="#fff" color="#000">
          {totalQuantity}
        </Badge>
      )}
      {children}
    </CartBadgeContainer>
  );
};

export default CartBadge;
