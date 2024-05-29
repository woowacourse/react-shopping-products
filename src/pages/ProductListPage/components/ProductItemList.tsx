import { useCallback, useEffect, useRef, useState } from 'react';
import ProductItem from './ProductItem';
import useProducts from '../../../hooks/useProducts';
import styles from '../ProductListPage.module.css';

interface Props {
  handleCount: (cartItemCount: number) => void;
}

const ProductItemList = ({ handleCount }: Props) => {
  const [selectedItems, setSelectedItems] = useState(new Set());
  const { products, setPage, hasMore } = useProducts();
  const observer = useRef<IntersectionObserver | null>(null);

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

  const lastProductElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, setPage],
  );

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
