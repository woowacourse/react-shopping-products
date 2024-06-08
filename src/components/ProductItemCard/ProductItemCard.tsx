import formatPriceToKoreanWon from '../../util/formatPriceToKoreanWon';
import * as S from './ProductItemCard.style';
import CartButton from '../CartButton/CartButton';
import { ProductItem } from '../../type/ProductItem';

const ItemCard: React.FC<ProductItem> = ({ id, name, price, imageUrl }) => {
  return (
    <li key={id}>
      <S.ItemCardSection>
        <S.ItemImage src={imageUrl} />
        <S.ItemInfo>
          <h3>{name}</h3>
          <p>{formatPriceToKoreanWon(price)}</p>
        </S.ItemInfo>

        <S.ItemCardBottom>
          <CartButton productId={id} />
        </S.ItemCardBottom>
      </S.ItemCardSection>
    </li>
  );
};

export default ItemCard;
