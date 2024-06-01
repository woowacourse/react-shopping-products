import { ProductItemData } from '@/types';
import ProductItem from '../ProductItem/ProductItem';
import styles from './ProductList.module.css';

type Props = {
  productList: ProductItemData[];
};

export default function ProductList({ productList }: Props) {
  return (
    <ul className={styles.ul}>
      {!productList.length ? (
        <div>목록이 비어있습니다.</div>
      ) : (
        <>
          {productList.map((product, index) => {
            return <ProductItem key={index} {...product} />;
          })}
        </>
      )}
    </ul>
  );
}
