import CustomButton from '../../../shared/ui/CustomButton';
import { Product } from '../type/product';
import * as S from './ProductCard.styles';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <S.ProductCardContainer>
      <S.ImageSection src={product.imageUrl} alt={product.name}></S.ImageSection>
      <S.ContentSection>
        <S.ProductName>{product.name}</S.ProductName>
        <S.ProductPrice>{product.price}</S.ProductPrice>
      </S.ContentSection>
      <S.ButtonSection>
        <CustomButton iconUrl='/addCartIcon.svg' title='담기' onClick={() => {}} />
      </S.ButtonSection>
    </S.ProductCardContainer>
  );
}
