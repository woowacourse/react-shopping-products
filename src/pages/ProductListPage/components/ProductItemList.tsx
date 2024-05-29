import { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import useProducts from '../../../hooks/useProducts';
import styles from '../ProductListPage.module.css';

interface Props {
  handleCount: (cartItemCount: number) => void;
}

const ProductItemList = ({ handleCount }: Props) => {
  const [selectedItems, setSelectedItems] = useState(new Set());
  const { products } = useProducts();

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
      {products.map((item) => {
        return (
          <ProductItem
            key={`item-${item.id}`}
            item={item}
            isSelected={selectedItems.has(item.id)}
            onSelect={() => {
              handleSelect(item.id);
            }}
          />
        );
      })}
    </div>
  );
};

export default ProductItemList;
