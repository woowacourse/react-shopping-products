import { Suspense } from 'react';
import ShopHeader from '../../shop/components/header/ShopHeader';
import ProductFilterList from './product-filter-list/ProductFilterList';
import { Loading } from '../../components/common';
import ErrorBoundary from '../../components/features/error-boundary/ErrorBoundary';

function ShopPage() {
  return (
    <ErrorBoundary>
      <ShopHeader />
      <Suspense fallback={<Loading />}>
        <ProductFilterList />
      </Suspense>
    </ErrorBoundary>
  );
}

export default ShopPage;
