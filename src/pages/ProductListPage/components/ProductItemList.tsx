import ProductItem from './ProductItem';
import { useInfinityScroll } from '../../../hooks/useInfinityScroll';
import Loader from '../../../components/Loader/Loader';
import styles from '../ProductListPage.module.css';
import { ProductType } from '../../../types';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  products: ProductType[];
  setPage: Dispatch<SetStateAction<number>>;
  hasMore: boolean;
  selectedItems: Set<number>;
  handleSelect: (id: number) => void;
  isLoading: boolean;
}

const ProductItemList = ({
  products,
  setPage,
  hasMore,
  selectedItems,
  handleSelect,
  isLoading,
}: Props) => {
  const { lastProductElementRef } = useInfinityScroll({ hasMore, setPage });

  return (
    <>
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
        {products.length !== 0 && (
          <p className={styles.infinityScrollTarget} ref={lastProductElementRef} />
        )}
      </div>
      {isLoading && <Loader />}
    </>
  );
};

export default ProductItemList;
