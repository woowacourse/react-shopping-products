import { LegacyRef } from 'react';
import formatPriceToKoreanWon from '../../util/formatPriceToKoreanWon';
import {
  ItemCardSection,
  ItemInfo,
  ItemCardBottom,
  ItemImage,
} from './ProductItemCard.style';
import CartButton from '../CartButton/CartButton';

interface ProductItemCardProps {
  ref?: LegacyRef<HTMLLIElement> | undefined;
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  initIsInCart: boolean;
}

const ProductItemCard: React.FC<ProductItemCardProps> = ({
  ref,
  id,
  name,
  price,
  imageUrl,
  initIsInCart,
}) => {
  return (
    <li key={id} ref={ref}>
      <ItemCardSection>
        <ItemImage src={imageUrl} />
        <ItemInfo>
          <h3>{name}</h3>
          <p>{formatPriceToKoreanWon(price)}</p>
        </ItemInfo>

        <ItemCardBottom>
          <CartButton productId={id} initIsInCart={initIsInCart} />
        </ItemCardBottom>
      </ItemCardSection>
    </li>
  );
};

export default ProductItemCard;
