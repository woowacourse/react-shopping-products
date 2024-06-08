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

interface CartItemCardProps {
  cartItem: CartItem;
}

const CartItemCard: React.FC<CartItemCardProps> = ({
  cartItem: { id, product },
}) => {
  const { delelteCartMutation } = useDeleteCartItem();

  const handleRemoveCartItem = () => {
    delelteCartMutation.mutate(id);
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
            color="#000"
            backgroundColor="#fff"
            onClick={handleRemoveCartItem}
            hasBorderRadius
            borderColor="#0000001A"
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
