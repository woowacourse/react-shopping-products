import { LegacyRef } from 'react';
import { Cart } from '../../asset';
import formatPriceToKoreanWon from '../../util/formatPriceToKoreanWon';
import Button from '../common/Button/Button';
import {
  ItemCardSection,
  ItemInfo,
  ItemCardBottom,
  ButtonImg,
  ItemImage,
} from './ItemCard.style';

interface ItemCardProps {
  ref?: LegacyRef<HTMLLIElement> | undefined;
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

const ItemCard: React.FC<ItemCardProps> = ({
  ref,
  id,
  name,
  price,
  imageUrl,
}) => {
  return (
    <li key={id} ref={ref ?? ref}>
      <ItemCardSection>
        <ItemImage src={imageUrl} />
        <ItemInfo>
          <h3>{name}</h3>
          <p>{formatPriceToKoreanWon(price)}</p>
        </ItemInfo>

        <ItemCardBottom>
          <Button>
            <ButtonImg src={Cart} />
            <span>담기</span>
          </Button>
        </ItemCardBottom>
      </ItemCardSection>
    </li>
  );
};

export default ItemCard;
