import Dropdown from './components/common/Dropdown';
import Title from './components/common/Title';
import Layout from './components/layout';
import Header from './components/product/Header';

import styled from '@emotion/styled';
import IntersectionArea from './components/common/IntersectionArea';
import useProducts, { SortType } from './components/hooks/useProducts';
import ProductItem from './components/product/ProductItem';
import ProductList from './components/product/ProductList';
import { CartItemsProvider } from './context/CartItemsProvider';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const FilterContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function App() {
  const { products, setCategory, setSort, fetchNextPage, error, loading } =
    useProducts();

  const onCategorySelect = (value: string) => {
    setCategory(value);
  };
  const onSortSelect = (value: string) => {
    setSort(value as SortType);
  };

  return (
    <Wrapper>
      <CartItemsProvider>
        <Layout header={<Header />}>
          <Title content={'bpple 상품 목록'} />
          <FilterContainer>
            <Dropdown
              size="small"
              defaultContent={'전체'}
              // TODO: 상수화
              options={[
                { content: '전체', value: '' },
                { content: '패션', value: 'fashion' },
                { content: '음료', value: 'beverage' },
                { content: '전자제품', value: 'electronics' },
                { content: '주방가전', value: 'kitchen' },
                { content: '운동', value: 'fitness' },
                { content: '도서', value: 'books' },
              ]}
              onSelect={onCategorySelect}
            />
            <Dropdown
              size="small"
              defaultContent="낮은 가격 순"
              options={[
                { content: '낮은 가격 순', value: 'asc' },
                { content: '높은 가격 순', value: 'desc' },
              ]}
              onSelect={onSortSelect}
            />
          </FilterContainer>

          <ProductList loading={loading} error={error}>
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
    </Wrapper>
  );
}

export default App;
