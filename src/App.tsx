import Dropdown from './components/common/Dropdown';
import Title from './components/common/Title';
import Layout from './components/layout';
import Header from './components/product/Header';

import styled from '@emotion/styled';
import IntersectionArea from './components/common/IntersectionArea';
import useProducts from './components/hooks/useProducts';
import ProductItem from './components/product/ProductItem';
import ProductList from './components/product/ProductList';
import { CartItemsProvider } from './context/CartItemsProvider';

import { SortOrder } from './api/types';
import { CATEGORY, SORT } from './constants/filterOptions';
import { PAGE_INFORMATION } from './constants/page';
import { Category } from './types';

function App() {
  const { products, setCategory, setSort, fetchNextPage, error, isLoading } =
    useProducts();

  const onCategorySelect = (value: string) => {
    setCategory(value as Category);
  };
  const onSortSelect = (value: string) => {
    setSort(value as SortOrder);
  };

  return (
    <S.Wrapper>
      <CartItemsProvider>
        <Layout header={<Header />}>
          <Title content={PAGE_INFORMATION.main.title} />

          <S.FilterContainer>
            <Dropdown
              size="small"
              defaultContent={CATEGORY.defaultContent}
              options={CATEGORY.options}
              onSelect={onCategorySelect}
            />
            <Dropdown
              size="small"
              defaultContent={SORT.defaultContent}
              options={SORT.options}
              onSelect={onSortSelect}
            />
          </S.FilterContainer>

          <ProductList isLoading={isLoading} error={error}>
            {products.map((product, idx) => {
              return idx + 1 !== products.length ? (
                <ProductItem product={product} key={`${product.id}_${idx}`} />
              ) : (
                <IntersectionArea
                  onImpression={fetchNextPage}
                  key={`${product.id}_${idx}`}
                >
                  <ProductItem product={product} />
                </IntersectionArea>
              );
            })}
          </ProductList>
        </Layout>
      </CartItemsProvider>
    </S.Wrapper>
  );
}

export default App;

const S = {
  Wrapper: styled.div`
    display: flex;
    justify-content: center;
  `,

  FilterContainer: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
};
