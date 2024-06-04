import * as S from './style';

import { useContext, useRef } from 'react';

import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import ProductItem from '../ProductItem';
import { UseProductsContext } from '../ShoppingProductsPage';

const ProductsContent = () => {
  const { products, fetchNextPage, productsLoading } = useContext(UseProductsContext);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useIntersectionObserver(productsLoading, observerRef, fetchNextPage, { threshold: 0.8 });

  return (
    <S.ProductsContent>
      {products.map((product) => (
        <ProductItem key={product.id} {...product} />
      ))}
      <div ref={observerRef} id="observer" style={{ height: '10px' }} />
    </S.ProductsContent>
  );
};

export default ProductsContent;
