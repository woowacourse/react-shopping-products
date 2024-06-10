import { useRef } from 'react';

import { useCartItems } from '@/pages/cart/model/useCartItems';
import { Layout, Spinner, Toast, cartItemsAPI } from '@/shared';
import { ContentHeader } from '@/widgets/ContentHeader';
import { HeaderCartButton, HeaderLogoButton, LayoutHeader } from '@/widgets/LayoutHeader';
import { ProductList } from '@/widgets/ProductList';

import { useInfiniteScroll } from '../../model/useInfiniteScroll';
import { useProducts } from '../../model/useProducts';

import css from './ProductPage.module.css';

export const ProductPage = () => {
  const { products, loading, error, category, sortOrder, fetchNextPage, handleChangeCategory, handleChangeSortOrder } =
    useProducts();
  const observationTarget = useRef<HTMLDivElement>(null);
  const { cartItems, loading: cartLoading, error: cartError } = useCartItems();

  useInfiniteScroll(observationTarget, loading, fetchNextPage);

  const handleAddToCart = async (productId: number) => {
    await cartItemsAPI.post({ productId, quantity: 1 });
  };

  return (
    <Layout
      headerSlot={
        <>
          <LayoutHeader
            leftSlot={<HeaderLogoButton />}
            rightSlot={<HeaderCartButton cartItemCount={cartItems.length} />}
          />
          {error && <Toast>오류가 발생했습니다. 잠시 후 다시 시도해 주세요.</Toast>}
          {cartError && <Toast>장바구니를 불러오는 중 오류가 발생했습니다.</Toast>}
        </>
      }
      contentHeaderSlot={<ContentHeader title={'상품 목록'} />}
      contentBodySlot={
        <>
          <div>
            <ProductList
              cartItems={cartItems}
              products={products}
              category={category}
              sortOrder={sortOrder}
              onChangeCategory={handleChangeCategory}
              onChangeSortOrder={handleChangeSortOrder}
              onClickAddToCartButton={handleAddToCart}
            />
            <div className={css.observationTarget} ref={observationTarget}></div>
          </div>
          {(loading || cartLoading) && (
            <div className={css.spinnerWrapper}>
              <Spinner />
            </div>
          )}
        </>
      }
      gap={{ top: 24 }}
    />
  );
};
