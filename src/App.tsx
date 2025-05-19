import GlobalStyle from './ui/styles/globalStyle';
import Layout from './ui/components/Layout/Layout';
import Header from './ui/components/Header/Header';
import Toast from './ui/components/Toast/Toast';
import ProductSection from './ui/components/ProductSection/ProductSection';
import LoadingSpinner from './ui/components/LoadingSpinner/LoadingSpinner';
import React, { useState } from 'react';
import { Global } from '@emotion/react';
import { addCart, removeCart } from './api/cart';
import { useProducts } from './hooks/useProducts';
import { CategoryType, SortType, ProductElement } from './types/product';
import { MAX_CART_ITEM_TYPE } from "./constants/productConfig";
import { ERROR_MESSAGES } from "./constants/errorMessages";

function App() {
  const [sort, setSort] = useState<SortType>('낮은 가격 순');
  const [category, setCategory] = useState<CategoryType>('전체');

  const mappedSortType = sort === '낮은 가격 순' ? 'asc' : 'desc';

  const { data, cart, isLoading, isError, setIsError, fetchData } = useProducts(
    mappedSortType,
    category
  );

  const handleAddCart = async (product: ProductElement) => {
    if (cart?.totalElements === MAX_CART_ITEM_TYPE) {
      console.error(ERROR_MESSAGES.maxCartItemType);
      setIsError(true);
      return;
    }

    try {
      await addCart(product.id);
      await fetchData();
    } catch {
      console.error(ERROR_MESSAGES.failedAddCart);
      setIsError(true);
    }
  };

  const handleRemoveCart = async (product: ProductElement) => {
    if (!product.cartId) {
      console.error(ERROR_MESSAGES.invalidCartID);
      setIsError(true);
      return;
    }

    try {
      await removeCart(product.cartId);
      await fetchData();
    } catch (error) {
      console.error(ERROR_MESSAGES.failedRemoveCart, error);
      setIsError(true);
    }
  };

  const handleFilterCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    if (value === '전체' || value === '식료품' || value === '패션잡화')
      setCategory(value);
  };

  const handleSortPrice = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    if (value === '낮은 가격 순' || value === '높은 가격 순') {
      setSort(value);
    }
  };

  return (
    <>
      <Global styles={GlobalStyle} />
      <Layout>
        <Header title="SHOP" totalCartProducts={cart && cart.totalElements} />
        {isError && (
          <Toast message="오류가 발생했습니다. 잠시 후 다시 시도해 주세요." />
        )}
        {isLoading && <LoadingSpinner duration={2} />}
        {!isLoading && (
          <ProductSection
            onFilter={handleFilterCategory}
            onSort={handleSortPrice}
            onAddCart={handleAddCart}
            onRemoveCart={handleRemoveCart}
            data={data}
            sort={sort}
            category={category}
          />
        )}
      </Layout>
    </>
  );
}

export default App;
