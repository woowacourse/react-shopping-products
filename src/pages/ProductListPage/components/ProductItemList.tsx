import ProductItem from './ProductItem';
import { useInfinityScroll } from '../../../hooks/useInfinityScroll';
import Loader from '../../../components/Loader/Loader';
import styles from '../ProductListPage.module.css';
import { CartItemType, ProductType } from '../../../types';

interface Props {
  products: ProductType[];
  cartItems: CartItemType[];
  isLoading: boolean;
  fetchNextPage: () => void;
}

const ProductItemList = ({ products, fetchNextPage, cartItems, isLoading }: Props) => {
  const { lastProductElementRef } = useInfinityScroll({ onIntersect: fetchNextPage });
  const handlerSelectCartItems = (productId: number): boolean => {
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
              isSelected={handlerSelectCartItems(item.id)}
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
