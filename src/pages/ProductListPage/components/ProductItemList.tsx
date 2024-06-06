import ProductItem from './ProductItem';
import useProducts from '../../../hooks/useProducts';
import { useInfinityScroll } from '../../../hooks/useInfinityScroll';
import Loader from '../../../components/Loader/Loader';
import styles from '../ProductListPage.module.css';
import { useToast } from '../../../hooks/useToast';

interface Props {
  handleCount: (cartItemCount: number) => void;
  selectBarCondition: Record<string, string>;
}

const ProductItemList = ({ handleCount, selectBarCondition }: Props) => {
  const {
    products,
    increaseNextPage,
    selectedItems,
    handleSelect,
    isLoading,
    errorCartItemsFetch,
  } = useProducts({
    selectBarCondition,
    handleCount,
  });
  const { lastProductElementRef } = useInfinityScroll({ onIntersect: increaseNextPage });
  const { showToast } = useToast();

  if (errorCartItemsFetch.isError) {
    showToast({ message: errorCartItemsFetch.message, duration: 3000 });
  }

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
        {products.length !== 0 && <p style={{ height: '10px' }} ref={lastProductElementRef}></p>}
      </div>
      {isLoading && <Loader />}
    </>
  );
};

export default ProductItemList;
