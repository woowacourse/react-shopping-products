import * as S from './style';

import { useRef } from 'react';

import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import ProductItem from '../ProductItem';
import useProducts from '../../hooks/useProducts';

const ProductsContent = () => {
  const { getProducts } = useProducts();

  const observerRef = useRef<HTMLDivElement | null>(null);

  useIntersectionObserver(getProducts.isLoading, observerRef, getProducts.fetchNextPage, {
    threshold: 0.8,
  });

  return (
    <S.ProductsContent>
      {getProducts.data &&
        getProducts.data.map((product) => <ProductItem key={product.id} {...product} />)}
      <div ref={observerRef} id="observer" style={{ height: '10px' }} />
    </S.ProductsContent>
  );
};

export default ProductsContent;
