import { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import useProducts from '../../../hooks/useProducts';
import styles from '../ProductListPage.module.css';
import { useInfinityScroll } from '../../../hooks/useInfinityScroll';

interface Props {
  handleCount: (cartItemCount: number) => void;
  selectBarCondition: Record<string, string>;
}

const ProductItemList = ({ handleCount, selectBarCondition }: Props) => {
  const [selectedItems, setSelectedItems] = useState(new Set());
  const { products, setPage, hasMore } = useProducts({ selectBarCondition });
  const { lastProductElementRef } = useInfinityScroll({ hasMore, setPage });

  useEffect(() => {
    handleCount(selectedItems.size);
  }, [selectedItems, handleCount]);

  const handleSelect = (itemId: number) => {
    setSelectedItems((prev) => {
      const newSelectedItems = new Set(prev);
      if (selectedItems.has(itemId)) {
        newSelectedItems.delete(itemId);
      } else {
        newSelectedItems.add(itemId);
      }
      return newSelectedItems;
    });
  };

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
      {products.length !== 0 && <p ref={lastProductElementRef}></p>}
    </div>
  );
};

export default ProductItemList;
