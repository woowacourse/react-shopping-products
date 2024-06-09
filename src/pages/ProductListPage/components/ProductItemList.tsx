import ProductItem from './ProductItem';
import { useInfinityScroll } from '../../../hooks/useInfinityScroll';
import Loader from '../../../components/Loader/Loader';
import styles from '../ProductListPage.module.css';
import useProducts from '@/hooks/useProducts';
import { CartItemType } from '@/types';

interface Props {
  selectBarCondition: Record<string, string>;
  cartItems: CartItemType[];
}

const ProductItemList = ({ selectBarCondition, cartItems }: Props) => {
  const { products, fetchNextPage, isFetching } = useProducts({
    selectBarCondition,
  });
  const { lastProductElementRef } = useInfinityScroll({ onIntersect: fetchNextPage });

  return (
    <>
      <div className={styles.productItemListContainer}>
        {products?.map((item, idx) => {
          const cartItem = cartItems.find((cartItem) => {
            return cartItem.product.id === item.id;
          });

          return (
            <ProductItem
              key={`item-${item.id}-${idx}`}
              item={item}
              cartItem={cartItem as CartItemType}
            />
          );
        })}
        {products?.length !== 0 && <p style={{ height: '10px' }} ref={lastProductElementRef}></p>}
      </div>
      {isFetching && <Loader />}
    </>
  );
};

export default ProductItemList;
