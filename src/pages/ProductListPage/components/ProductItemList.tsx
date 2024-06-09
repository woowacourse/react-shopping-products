import ProductItem from './ProductItem';
import useProducts from '../../../hooks/useProducts';
import { useInfinityScroll } from '../../../hooks/useInfinityScroll';
import Loader from '../../../components/Loader/Loader';
import styles from '../ProductListPage.module.css';
import { useToast } from '../../../hooks/useToast';
import useCartItemQuery from '@/hooks/useCartItemQuery';

interface Props {
  handleCount: (cartItemCount: number) => void;
  selectBarCondition: Record<string, string>;
}

const ProductItemList = ({ handleCount, selectBarCondition }: Props) => {
  const { products, fetchNextPage, errorCartItemsFetch, isFetching } = useProducts({
    selectBarCondition,
    handleCount,
  });
  const { lastProductElementRef } = useInfinityScroll({ onIntersect: fetchNextPage });
  const { showToast } = useToast();

  const { cartItems } = useCartItemQuery();

  if (errorCartItemsFetch.isError) {
    showToast({ message: errorCartItemsFetch.message, duration: 3000 });
  }

  return (
    <>
      <div className={styles.productItemListContainer}>
        {products?.map((item, idx) => {
          const cartItem = cartItems?.find((cartItem) => {
            return cartItem.product.id === item.id;
          });

          return <ProductItem key={`item-${item.id}-${idx}`} item={item} cartItem={cartItem} />;
        })}
        {products?.length !== 0 && <p style={{ height: '10px' }} ref={lastProductElementRef}></p>}
      </div>
      {isFetching && <Loader />}
    </>
  );
};

export default ProductItemList;
