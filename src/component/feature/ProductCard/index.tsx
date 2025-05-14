import Button from '../../@common/Button';
import Text from '../../@common/Text';

import {
  productCardButtonContainerStyle,
  productCardContentHeaderStyle,
  productCardContentStyle,
  productCardImageContainerStyle,
  productCardImageStyle,
  productCardStyle,
} from './ProductCard.styles';
import { Product } from '../../../types/response';

interface ProductCardProps extends Omit<Product, 'id' | 'category'> {}

const ProductCard = ({ name, price, imageUrl }: ProductCardProps) => {
  return (
    <section css={productCardStyle}>
      <div css={productCardImageContainerStyle}>
        <img css={productCardImageStyle} src={imageUrl} alt={name} />
      </div>
      <div css={productCardContentStyle}>
        <div css={productCardContentHeaderStyle}>
          <Text variant="productName">{name}</Text>
          <Text variant="body">{price.toLocaleString()}원</Text>
        </div>
        <div css={productCardButtonContainerStyle}>
          <Button variant="default">담기</Button>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
