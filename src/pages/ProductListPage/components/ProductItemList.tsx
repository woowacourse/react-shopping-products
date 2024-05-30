import { useEffect } from 'react';
import ProductItem from './ProductItem';
import useProducts from '../../../hooks/useProducts';
import styles from '../ProductListPage.module.css';
import { useInfinityScroll } from '../../../hooks/useInfinityScroll';

interface Props {
  handleCount: (cartItemCount: number) => void;
  selectBarCondition: Record<string, string>;
}

const ProductItemList = ({ handleCount, selectBarCondition }: Props) => {
  const { products, setPage, hasMore, selectedItems, handleSelect } = useProducts({
    selectBarCondition,
  });
  const { lastProductElementRef } = useInfinityScroll({ hasMore, setPage });

  useEffect(() => {
    handleCount(selectedItems.size);
  }, [selectedItems, handleCount]);

  return (
    <div className={styles.productItemListContainer}>
      {products.map((item, idx) => {
        return (
          <ProductItem
            key={`item-${item.id}-${idx}`}
            item={item}
            isSelected={selectedItems.has(item.id)}
            onSelect={() => {
              handleSelect(item.id);
            }}
          />
        );
      })}
      {products.length !== 0 && <p style={{ height: '10px' }} ref={lastProductElementRef}></p>}
    </div>
  );
};

export default ProductItemList;
