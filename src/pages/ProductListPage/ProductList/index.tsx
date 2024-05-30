import { CartItem, Product } from '@appTypes/index';
import { useEffect, useRef } from 'react';

import ProductCard from '../ProductCard';

import style from './style.module.css';

interface ProductListProps {
  products: Product[];
  targetRef: React.MutableRefObject<HTMLDivElement | null>;
  loading: boolean;
  cartItems: CartItem[];
}
function ProductList({ products, targetRef, loading, cartItems }: ProductListProps) {
  const productListRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (products.length <= 20) {
      productListRef.current?.scrollTo({ top: 0 });
    }
  }, [productListRef, products]);

  return (
    <section ref={productListRef} className={style.wrapper}>
      <ul className={style.productList}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} cartItems={cartItems} />
        ))}
        {loading && <div>로딩중....</div>}
        <div className={style.target} ref={targetRef}>
          <span>target</span>
        </div>
      </ul>
    </section>
  );
}

export default ProductList;
