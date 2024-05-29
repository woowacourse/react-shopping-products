import { Product } from '@src/appTypes/product';

import ProductCard from '../ProductCard';

import style from './style.module.css';

interface ProductListProps {
  products: Product[];
}
function ProductList({ products }: ProductListProps) {
  return (
    <section className={style.wrapper}>
      <ul className={style.productList}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </section>
  );
}

export default ProductList;
