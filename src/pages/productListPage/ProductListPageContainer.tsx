import { Suspense } from 'react';
import ProductListPage from './ProductListPage';
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorComponent from '@/apis/ErrorComponent/ErrorComponent';

const ProductListPageContainer = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorComponent}>
      <Suspense fallback={<LoadingSpinner />}>
        <ProductListPage />
      </Suspense>
    </ErrorBoundary>
  );
};

export default ProductListPageContainer;
