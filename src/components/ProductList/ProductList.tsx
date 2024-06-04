import { Product } from '@/types/product.type';
import ProductItem from '../ProductItem/ProductItem';
import styles from './ProductList.module.css';

export default function ProductList({ productList }: { productList: Product[] }) {
  return (
    <ul className={styles.ul}>
      {productList.length === 0 ? (
        <div>목록이 비어있습니다.</div>
      ) : (
        <>
          {productList.map((product) => (
            <ProductItem {...product} key={product.id} />
          ))}
        </>
      )}
    </ul>
  );
}
