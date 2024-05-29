import React from 'react';
import useFetchProducts from '../../hooks/useFetchProducts';
import ProductCard from '../ProductCard/ProductCard';
import * as S from './ProductList.styled';

function ProductList() {
  const { products, isError, isPending, fetchNextPage, page } =
    useFetchProducts();

  return (
    <S.ProductListContainer>
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </S.ProductListContainer>
  );
}

export default ProductList;
