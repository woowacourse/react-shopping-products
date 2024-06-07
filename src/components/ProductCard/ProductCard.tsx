import { useContext } from 'react';

import { CartContext } from '../../context/CartContext';
import { Product } from '../../types/fetch';
import { CartButton } from '../index';

import * as S from './ProductCard.styled';

interface ProductCardProps {
  product: Product;
  onToggleDetailModal: () => void;
}

function ProductCard({ product, onToggleDetailModal }: ProductCardProps) {
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error('CartContext가 비어있습니다.');
  }
  const {
    addCartItem,
    deleteCartItem,
    // isDeletePending,
    // isDeleteError,
  } = cartContext;

  return (
    <div onClick={onToggleDetailModal}>
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
              deleteCartItem(product.id);
            }}
          />
        </S.ButtonContainer>
      </S.ContentWrapper>
    </div>
  );
}

export default ProductCard;
