import { Product } from '@appTypes/index';
import { LOAD_MORE_PRODUCTS_AMOUNT } from '@constants/index';
import { useEffect, useRef } from 'react';

import ProductCard from '../ProductCard';
import { ProductListSkeleton } from '../Skeleton';

import style from './style.module.css';
import './ProductList.css';

interface ProductListProps {
  products: Product[];
  targetRef: React.MutableRefObject<HTMLDivElement | null>;
  loading: boolean;
}
function ProductList({ products, targetRef, loading }: ProductListProps) {
  const productListRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (products.length <= 20) {
      productListRef.current?.scrollTo({ top: 0 });
    }
  }, [productListRef, products]);

  return (
    <section ref={productListRef} className="product-list-wrapper">
      <ul className="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        <div className={style.target} ref={targetRef}>
          <span>target</span>
        </div>
      </ul>
      {loading && <ProductListSkeleton productsLength={LOAD_MORE_PRODUCTS_AMOUNT} />}
    </section>
  );
}

export default ProductList;
