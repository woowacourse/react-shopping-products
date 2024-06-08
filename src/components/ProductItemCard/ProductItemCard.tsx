import { LegacyRef } from 'react';
import { formatPriceToKoreanWon } from '@/utils/index';
import {
  CartButton,
  FallbackImageLoader,
  FallbackImage,
} from '@/components/index';
import {
  ItemCardSection,
  ItemInfo,
  ItemCardBottom,
  ItemImage,
} from './ProductItemCard.style';

interface ProductItemCardProps {
  ref?: LegacyRef<HTMLLIElement> | undefined;
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

const ProductItemCard: React.FC<ProductItemCardProps> = ({
  ref,
  id,
  name,
  price,
  imageUrl,
}) => {
  return (
    <li key={id} ref={ref}>
      <ItemCardSection>
        <FallbackImageLoader fallbackComponent={<FallbackImage />}>
          <ItemImage src={imageUrl} />
        </FallbackImageLoader>

        <ItemInfo>
          <h3>{name}</h3>
          <p>{formatPriceToKoreanWon(price)}</p>
        </ItemInfo>

        <ItemCardBottom>
          <CartButton productId={id} />
        </ItemCardBottom>
      </ItemCardSection>
    </li>
  );
};

export default ProductItemCard;
