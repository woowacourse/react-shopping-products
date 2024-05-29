import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import * as S from './ProductList.styled';
import { Product } from '../../types/fetch';

interface ProductListProps {
  products: Product[];
}

function ProductList({ products }: ProductListProps) {
  return (
    <S.ProductListContainer>
      {products.map((product, i) => {
        return <ProductCard key={i} product={product} />;
      })}
    </S.ProductListContainer>
  );
}

export default ProductList;
