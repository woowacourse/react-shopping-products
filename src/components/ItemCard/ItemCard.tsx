import formatPriceToKoreanWon from '../../util/formatPriceToKoreanWon';
import {
  ItemCardSection,
  ItemInfo,
  ItemCardBottom,
  ItemImage,
} from './ItemCard.style';
import CartButton from '../CartButton/CartButton';
import { ProductItem } from '../../type/ProductItem';

const ItemCard: React.FC<ProductItem> = ({ id, name, price, imageUrl }) => {
  return (
    <li key={id}>
      <ItemCardSection>
        <ItemImage src={imageUrl} />
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

export default ItemCard;
