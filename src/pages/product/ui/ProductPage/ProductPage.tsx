import { useState } from "react";

import { Product } from "@/entities/product";
import { Layout, Spinner, Toast } from "@/shared";
import useIntersectionObserver from "@/shared/hooks/useIntersectionObserver";
import { ContentHeader } from "@/widgets/ContentHeader";
import {
  HeaderCartButton,
  HeaderLogoButton,
  LayoutHeader,
} from "@/widgets/LayoutHeader";
import { ProductList } from "@/widgets/ProductList";

import useProducts from "../../model/useProducts";

import css from "./ProductPage.module.css";

export const ProductPage = () => {
  const [cartItems, setCartItems] = useState<number[]>([]);

  const {
    products,
    loading,
    error,
    category,
    sortOrder,
    fetchNextPage,
    handleChangeCategory,
    handleChangeSortOrder,
  } = useProducts();

  const { observerTarget } = useIntersectionObserver(fetchNextPage);

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
        <>
          <LayoutHeader
            leftSlot={<HeaderLogoButton />}
            rightSlot={<HeaderCartButton cartItemCount={cartItems.length} />}
          />
          {error && (
            <Toast>오류가 발생했습니다. 잠시 후 다시 시도해 주세요.</Toast>
          )}
        </>
      }
      contentHeaderSlot={<ContentHeader title={"상품 목록"} />}
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
            <div className={css.observationTarget} ref={observerTarget}></div>
          </div>
          {loading && (
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
