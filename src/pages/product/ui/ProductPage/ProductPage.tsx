import { useState, useRef, useEffect } from 'react';

import { Product } from '@/entities/product';
import { Layout, Spinner } from '@/shared';
import { ContentHeader } from '@/widgets/ContentHeader';
import { HeaderCartButton, HeaderLogoButton, LayoutHeader } from '@/widgets/LayoutHeader';
import { ProductList } from '@/widgets/ProductList';

import useProducts from '../../model/useProducts';

import css from './ProductPage.module.css';

export const ProductPage = () => {
  const [cartItems, setCartItems] = useState<number[]>([]);

  const { products, loading, error, category, sortOrder, fetchNextPage, handleChangeCategory, handleChangeSortOrder } =
    useProducts();

  const observationTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    if (!loading && observationTarget.current) {
      observer.observe(observationTarget.current);
    }

    return () => {
      if (observationTarget.current) {
        observer.unobserve(observationTarget.current);
      }
    };
  }, [fetchNextPage]);

  const handleToggleCartItem = (productId: number) => {
    if (cartItems.includes(productId)) {
      setCartItems((prev) => prev.filter((itemId) => itemId !== productId));
    } else {
      setCartItems((prev) => [...prev, productId]);
    }
  };

  return (
    <Layout
      headerSlot={
        <LayoutHeader
          leftSlot={<HeaderLogoButton />}
          rightSlot={<HeaderCartButton cartItemCount={cartItems.length} />}
        />
      }
      contentHeaderSlot={<ContentHeader title={'상품 목록'} />}
      contentBodySlot={
        <>
          <div>
            <ProductList
              products={products as Product[]}
              category={category}
              sortOrder={sortOrder}
              onChangeCategory={handleChangeCategory}
              onChangeSortOrder={handleChangeSortOrder}
              onToggleCartItem={handleToggleCartItem}
            />
            <div className={css.observationTarget} ref={observationTarget}></div>
          </div>
          {
            <div className={css.spinnerWrapper}>
              <Spinner />
            </div>
          }
        </>
      }
      gap={{ top: 24 }}
    />
  );
};
