import { CartBadgeContainer } from './CartBadge.style';
import { PropsWithChildren } from 'react';
import { useCartItemTotalQuantity } from '@/hooks/index';
import { Badge } from '@/components/index';
import { useTheme } from '@emotion/react';

const CartBadge: React.FC<PropsWithChildren> = ({ children }) => {
  const { totalQuantity, isLoading, isError } = useCartItemTotalQuantity();
  const { colors } = useTheme();

  if (isLoading) {
    return (
      <CartBadgeContainer>
        <Badge bgColor={colors.black} color={colors.white}>
          0
        </Badge>
        {children}
      </CartBadgeContainer>
    );
  }

  return (
    <CartBadgeContainer>
      {totalQuantity !== 0 && !isLoading && !isError && (
        <Badge bgColor={colors.white} color={colors.black}>
          {totalQuantity}
        </Badge>
      )}
      {children}
    </CartBadgeContainer>
  );
};

export default CartBadge;
