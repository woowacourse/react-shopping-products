import GlobalStyle from './ui/styles/globalStyle';
import Layout from './ui/components/Layout/Layout';
import Header from './ui/components/Header/Header';
import Toast from './ui/components/Toast/Toast';
import ProductSection from './ui/components/ProductSection/ProductSection';
import LoadingSpinner from './ui/components/LoadingSpinner/LoadingSpinner';
import React, { useState } from 'react';
import { Global } from '@emotion/react';
import { SortType, CategoryType } from './types/product';
import { useCartActions } from './hooks/useCartActions';

function App() {
  const [sort, setSort] = useState<SortType>('낮은 가격 순');
  const [category, setCategory] = useState<CategoryType>('전체');

  const mappedSortType = sort === '낮은 가격 순' ? 'asc' : 'desc';

  const {
    productsWithCartInfo,
    cart,
    isLoading,
    isError,
    handleAddCart,
    handleRemoveCart,
  } = useCartActions(mappedSortType, category);

  const handleFilterCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    if (value === '전체' || value === '식료품' || value === '패션잡화')
      setCategory(value);
  };

  const handleSortPrice = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
            cart={cart}
            products={productsWithCartInfo}
            sort={sort}
            category={category}
          />
        )}
      </Layout>
    </>
  );
}

export default App;
