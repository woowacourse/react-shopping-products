import { Product } from '@/types';
import ProductItem from '../ProductItem/ProductItem';
import styles from './ProductList.module.css';

export default function ProductList({ productList }: { productList: Product[] }) {
  return (
    <ul className={styles.ul}>
      {productList.map((product) => (
        <ProductItem {...product} />
      ))}
    </ul>
  );
}
