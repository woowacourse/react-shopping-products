import ProductItem from './ProductItem';
import { useInfinityScroll } from '../../../hooks/useInfinityScroll';
import Loader from '../../../components/Loader/Loader';
import styles from '../ProductListPage.module.css';
import { CartItemType, ProductType } from '../../../types';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  products: ProductType[];
  setPage: Dispatch<SetStateAction<number>>;
  hasMore: boolean;
  cartItems: CartItemType[];
  isLoading: boolean;
}

const ProductItemList = ({ products, setPage, hasMore, cartItems, isLoading }: Props) => {
  const { lastProductElementRef } = useInfinityScroll({ hasMore, setPage });
  const selectedHandler = (productId: number): boolean => {
    return cartItems.some((cartItem) => cartItem.product.id === productId);
  };

  return (
    <>
      <div className={styles.productItemListContainer}>
        {products.map((item, idx) => {
          return (
            <ProductItem
              key={`item-${item.id}-${idx}`}
              productItem={item}
              isSelected={selectedHandler(item.id)}
              cartItems={cartItems}
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
