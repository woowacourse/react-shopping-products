import Dropdown from './components/common/Dropdown';
import Title from './components/common/Title';
import Layout from './components/layout';
import Header from './components/product/Header';
import ProductList from './components/product/ProductList';

import styled from '@emotion/styled';
import useProducts from './components/hooks/useProducts';

import { CATEGORY, SORT } from './constants/filterOptions';
import { PAGE_INFORMATION } from './constants/page';
import { CartItemsProvider } from './context/cartItems/CartItemsProvider';

function App() {
  const useProductsResult = useProducts();

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
              onSelect={useProductsResult.setCategory}
            />
            <Dropdown
              size="small"
              defaultContent={SORT.defaultContent}
              options={SORT.options}
              onSelect={useProductsResult.setSort}
            />
          </S.FilterContainer>

          <ProductList {...useProductsResult} />
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
