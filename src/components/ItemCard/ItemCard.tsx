import formatPriceToKoreanWon from '../../util/formatPriceToKoreanWon';
import {
  ItemCardSection,
  ItemInfo,
  ItemCardBottom,
  ItemImage,
} from './ItemCard.style';
import CartButton from '../CartButton/CartButton';
import { ItemCardProps } from './ItemCard.type';

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
