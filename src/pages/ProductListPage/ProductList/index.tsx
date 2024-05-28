import Products from '@mocks/products.json';
import { Product } from '@src/appTypes/product';

import ProductCard from '../ProductCard';

import style from './style.module.css';

function ProductList() {
  const data = Products as Product[];
  return (
    <section className={style.wrapper}>
      <ul className={style.productList}>
        {data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </section>
  );
}

export default ProductList;
