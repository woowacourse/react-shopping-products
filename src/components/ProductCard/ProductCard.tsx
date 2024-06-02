import { useContext } from 'react';

import { CartContext } from '../../CartContext';
import { Product } from '../../types/fetch';
import CartButton from '../CartButton/CartButton';

import * as S from './ProductCard.styled';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { patchToAddCart, patchToRemoveCart } = useContext(CartContext);

  return (
    <S.ProductCardContainer>
      <S.ProductImage src={product.imageUrl} />
      <S.ContentWrapper>
        <S.InfoWrapper>
          <S.ProductName>{product.name}</S.ProductName>
          <S.ProductPrice>{product.price.toLocaleString()}원</S.ProductPrice>
        </S.InfoWrapper>

        <S.ButtonContainer>
          <CartButton
            id={product.id}
            onAddClick={() => {
              patchToAddCart(product.id);
            }}
            onDeleteClick={() => {
              patchToRemoveCart(product.id);
            }}
          />
        </S.ButtonContainer>
      </S.ContentWrapper>
    </S.ProductCardContainer>
  );
}

export default ProductCard;
