import { Product } from '@src/appTypes/product';

import ProductCard from '../ProductCard';

import style from './style.module.css';

interface ProductListProps {
  products: Product[];
  targetRef: React.MutableRefObject<HTMLDivElement | null>;
}
function ProductList({ products, targetRef }: ProductListProps) {
  return (
    <section className={style.wrapper}>
      <ul className={style.productList}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        <div className={style.target} ref={targetRef}>
          <span>target</span>
        </div>
      </ul>
    </section>
  );
}

export default ProductList;
