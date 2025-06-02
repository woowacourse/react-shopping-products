import * as S from './ProductCard.styled';
import { IMAGE_PATH } from '../../constants/imagePath';
import CartBottomButtonContainer from '../CartBottomButton/CartBottomButtonContainer';

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
    <S.ProductCardWrapper>
      <S.ProductImage
        src={imageUrl || defaultSrc}
        alt={name}
        onError={(e) => {
          const target = e.currentTarget;
          target.src = defaultSrc;
        }}
      />
      <S.ProductCardDetailWrapper>
        <S.ProductCardDetailTextWrapper>
          <S.ProductCardName>{name}</S.ProductCardName>
          <S.ProductCardPrice>{price.toLocaleString()}원</S.ProductCardPrice>
        </S.ProductCardDetailTextWrapper>
        <CartBottomButtonContainer id={id} />
      </S.ProductCardDetailWrapper>
    </S.ProductCardWrapper>
  );
};

export default ProductCard;
