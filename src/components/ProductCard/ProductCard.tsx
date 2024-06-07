import { useContext } from 'react';

import { CartContext } from '../../CartContext';
import { Product } from '../../types/fetch';
import CartButton from '../CartButton/CartButton';

import * as S from './ProductCard.styled';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  // const { postToAddCart, deleteToRemoveCart } = useContext(CartContext);
  const { addCartItem } = useContext(CartContext);

  return (
    <div>
      <S.ProductImage src={product.imageUrl} alt={product.name} />
      <S.ContentWrapper>
        <S.InfoWrapper>
          <S.ProductName>{product.name}</S.ProductName>
          <S.ProductPrice>{product.price.toLocaleString()}원</S.ProductPrice>
        </S.InfoWrapper>

        <S.ButtonContainer>
          <CartButton
            id={product.id}
            onAddClick={() => {
              addCartItem(product.id);
            }}
            onDeleteClick={() => {
              console.log('delete');
              // deleteToRemoveCart(product.id);
            }}
          />
        </S.ButtonContainer>
      </S.ContentWrapper>
    </div>
  );
}

export default ProductCard;
