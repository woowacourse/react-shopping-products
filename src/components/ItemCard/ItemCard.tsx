import { LegacyRef } from 'react';
import formatPriceToKoreanWon from '../../util/formatPriceToKoreanWon';
import {
  ItemCardSection,
  ItemInfo,
  ItemCardBottom,
  ItemImage,
} from './ItemCard.style';
import CartButton from '../CartButton/CartButton';

interface ItemCardProps {
  ref?: LegacyRef<HTMLLIElement> | undefined;
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  initIsInCart: boolean;
}

const ItemCard: React.FC<ItemCardProps> = ({
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

export default ItemCard;
