import { Product } from '@appTypes/index';
import { FIRST_LOAD_PRODUCTS_AMOUNT} from '@constants/index';
import { useEffect, useRef } from 'react';

import ProductCard from '../ProductCard';


import './ProductList.css';

interface ProductListProps {
  products: Product[];
  children: React.ReactNode;
}
function ProductList({ products, children }: ProductListProps) {
  const productListRef = useRef<HTMLElement | null>(null);

  const handleScrollbar = () => {
    if (products.length <= FIRST_LOAD_PRODUCTS_AMOUNT) {
      productListRef.current?.scrollTo({ top: 0 });
    }
  };

  useEffect(() => {
    handleScrollbar();
  }, [productListRef, products]);

  return (
    <section ref={productListRef} className="product-list-wrapper">
      <ul className="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {children}
      </ul>
    </section>
  );
}

export default ProductList;
