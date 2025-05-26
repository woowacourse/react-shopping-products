import {
  ProductCardWrapper,
  ProductCardDetailWrapper,
  ProductCardDetailTextWrapper,
  ProductCardName,
  ProductCardPrice,
  ProductImage,
} from '../styles/ProductCard';
import { IMAGE_PATH } from '../constants/imagePath';
import CartBottomButtonContainer from './CartBottomButton/CartBottomButtonContainer';

type ProductCardProps = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
};

const ProductCard = ({ id, name, price, imageUrl, category }: ProductCardProps) => {
  const defaultSrc =
    category === '패션잡화' ? IMAGE_PATH.DEFAULT_FASHION : IMAGE_PATH.DEFAULT_GROCERY;

  return (
    <ProductCardWrapper>
      <ProductImage
        src={imageUrl || defaultSrc}
        alt={name}
        onError={(e) => {
          const target = e.currentTarget;
          target.src = defaultSrc;
        }}
      />
      <ProductCardDetailWrapper>
        <ProductCardDetailTextWrapper>
          <ProductCardName>{name}</ProductCardName>
          <ProductCardPrice>{price.toLocaleString()}원</ProductCardPrice>
        </ProductCardDetailTextWrapper>
        <CartBottomButtonContainer id={id} />
      </ProductCardDetailWrapper>
    </ProductCardWrapper>
  );
};

export default ProductCard;
