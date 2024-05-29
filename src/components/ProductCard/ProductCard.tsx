import React, { useContext } from 'react';
import { CartContext } from '../../CartContext';
import { Product } from '../../types/fetch';
import AddCartButton from '../AddCartButton';
import * as S from './ProductCard.styled';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { cartIdSet, patchToAddCart, patchToRemoveCart } =
    useContext(CartContext);

  return (
    <div>
      <S.ProductImage src={product.imageUrl} />
      <div>{product.name}</div>
      <div>{product.price}</div>
      <AddCartButton onClick={() => {}} />
    </div>
  );
}

export default ProductCard;
