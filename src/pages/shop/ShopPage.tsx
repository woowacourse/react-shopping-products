import styled from '@emotion/styled';
import { Suspense } from 'react';
import { Loading } from '../../components/common';
import ErrorBoundary from '../../components/features/error-boundary/ErrorBoundary';
import ShopHeader from '../../shop/components/header/ShopHeader';
import ProductFilterList from './product-filter-list/ProductFilterList';

function ShopPage() {
  return (
    <ErrorBoundary>
      <Container>
        <Suspense fallback={<Loading />}>
          <ProductFilterList />
        </Suspense>
      </Container>
      <ShopHeader />
    </ErrorBoundary>
  );
}

const Container = styled.div`
  padding-top: 64px;
`;

export default ShopPage;
