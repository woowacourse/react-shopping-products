import { formatPriceToKoreanWon } from '@/utils/index';
import { CartItem } from '@/types/index';
import {
  CartItemCardContainer,
  CartItemImage,
  CartItemCardHeader,
  CartItemCardInfo,
} from './CartItemCard.style';
import { useDeleteCartItem } from '@/hooks/index';
import {
  FallbackImage,
  FallbackImageLoader,
  Button,
  QuantityPicker,
} from '@/components/index';
import { useTheme } from '@emotion/react';

interface CartItemCardProps {
  cartItem: CartItem;
}

const CartItemCard: React.FC<CartItemCardProps> = ({
  cartItem: { id, product },
}) => {
  const { deleteCartMutation } = useDeleteCartItem();
  const { colors } = useTheme();

  const handleRemoveCartItem = () => {
    deleteCartMutation.mutate(id);
  };

  return (
    <CartItemCardContainer>
      <FallbackImageLoader fallbackComponent={<FallbackImage />}>
        <CartItemImage src={product.imageUrl} />
      </FallbackImageLoader>

      <CartItemCardInfo>
        <CartItemCardHeader>
          <h3>{product.name}</h3>
          <Button
            color={colors.black}
            backgroundColor={colors.white}
            onClick={handleRemoveCartItem}
            hasBorderRadius
            borderColor={colors.border}
          >
            삭제
          </Button>
        </CartItemCardHeader>

        <p>{formatPriceToKoreanWon(product.price)}</p>
        <QuantityPicker productId={product.id} cartItemId={id} />
      </CartItemCardInfo>
    </CartItemCardContainer>
  );
};

export default CartItemCard;
