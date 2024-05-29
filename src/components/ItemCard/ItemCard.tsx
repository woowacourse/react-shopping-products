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
import { addCartItem } from '../../api';
import { useCart } from '../../context/ShoppingCartCountContext';
import { useToast } from '../../hooks/useToast';

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
  const { setCounts } = useCart();
  const { createToast } = useToast();

  const handleClick = async () => {
    try {
      await addCartItem(id);
      setCounts((prev) => prev + 1);
    } catch (error) {
      if (error instanceof Error) {
        createToast('⛔️ 상품을 담는데 실패했습니다. 다시 시도해 주세요.');
      }
    }
  };

  return (
    <li key={id} ref={ref ?? ref}>
      <ItemCardSection>
        <ItemImage src={imageUrl} />
        <ItemInfo>
          <h3>{name}</h3>
          <p>{formatPriceToKoreanWon(price)}</p>
        </ItemInfo>

        <ItemCardBottom>
          <Button onClick={handleClick}>
            <ButtonImg src={Cart} />
            <span>담기</span>
          </Button>
        </ItemCardBottom>
      </ItemCardSection>
    </li>
  );
};

export default ItemCard;
