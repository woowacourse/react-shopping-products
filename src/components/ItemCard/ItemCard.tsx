import formatPriceToKoreanWon from '../../util/formatPriceToKoreanWon';
import {
  ItemCardSection,
  ItemInfo,
  ItemCardBottom,
  ItemImage,
} from './ItemCard.style';
import CartButton from '../CartButton/CartButton';

interface ItemCardProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  initIsInCart: boolean;
}

const ItemCard: React.FC<ItemCardProps> = ({
  id,
  name,
  price,
  imageUrl,
  initIsInCart,
}) => {
  return (
    <li key={id}>
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
