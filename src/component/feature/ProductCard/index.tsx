import Button from '../../@common/Button';
import Text from '../../@common/Text';

import {
  productCardButtonContainerStyle,
  productCardContentHeaderStyle,
  productCardContentStyle,
  productCardImageContainerStyle,
  productCardImageStyle,
  productCardStyle
} from './ProductCard.styles';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <section css={productCardStyle}>
      <div css={productCardImageContainerStyle}>
        <img
          css={productCardImageStyle}
          src={product.imageUrl}
          alt={product.name}
        />
      </div>
      <div css={productCardContentStyle}>
        <div css={productCardContentHeaderStyle}>
          <Text variant="productName">{product.name}</Text>
          <Text variant="body">{product.price.toLocaleString()}원</Text>
        </div>
        <div css={productCardButtonContainerStyle}>
          <Button variant="default">담기</Button>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
