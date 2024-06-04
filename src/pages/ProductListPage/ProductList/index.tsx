import { CartItem, Filtering } from '@appTypes/index';
import { useEffect, useRef } from 'react';

import ProductCard from '../ProductCard';

import style from './style.module.css';
import useLoadProducts from '@queries/product/useLoadProducts';
import IntersectionObserverArea from '@components/IntersectionObserverArea';

interface ProductListProps {
  filtering: Filtering;
  refetch: () => Promise<void>;
  cartItems: CartItem[];
}

function ProductList({ filtering, refetch, cartItems }: ProductListProps) {
  const productListRef = useRef<HTMLElement | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { products, isLoading, fetchNextPage } = useLoadProducts(filtering);

  useEffect(() => {
    if (products.length <= 20) {
      productListRef.current?.scrollTo({ top: 0 });
    }
  }, [productListRef, products]);

  const getCartItem = (productId: number) => {
    const cartItem = cartItems.find((item) => item.product.id === productId);
    return cartItem;
  };

  const getNextPage = async () => {
    await fetchNextPage();
  };

  return (
    <IntersectionObserverArea callback={getNextPage} targetRef={targetRef}>
      <section ref={productListRef} className={style.wrapper}>
        <ul className={style.productList}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} cartItem={getCartItem(product.id)} refetch={refetch} />
          ))}
          {isLoading && <div>로딩 중</div>}
          <div className={style.target} ref={targetRef}>
            <span>target</span>
          </div>
        </ul>
      </section>
    </IntersectionObserverArea>
  );
}

export default ProductList;
