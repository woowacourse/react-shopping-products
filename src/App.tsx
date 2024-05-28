import Header from './components/product/Header';
import Title from './components/common/Title';
import Layout from './components/layout';
import Dropdown from './components/common/Dropdown';

import styled from '@emotion/styled';
import { useState } from 'react';
import ProductList from './components/product/ProductList';
import products from './mocks/products.json';

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
  const [category, setCategory] = useState('전체');
  const [sort, setSort] = useState('낮은 가격 순');

  const onCategorySelect = (value: string) => {
    setCategory(value);
  };
  const onSortSelect = (value: string) => {
    setSort(value);
  };

  return (
    <Wrapper>
      <Layout header={<Header />}>
        <Title content={'bpple 상품 목록'} />
        <FilterContainer>
          <Dropdown
            size="small"
            value={category}
            options={['전체', '옵션1', '옵션2', '옵션3']}
            onSelect={onCategorySelect}
          />
          <Dropdown
            size="small"
            value={sort}
            options={['낮은 가격순', '높은 가격순']}
            onSelect={onSortSelect}
          />
        </FilterContainer>

        <ProductList items={products.slice(0, 10)} />
      </Layout>
    </Wrapper>
  );
}

export default App;
