import { Suspense } from 'react';
import ProductListPage from './ProductListPage';
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner';

const ProductListPageContainer = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProductListPage />
    </Suspense>
  );
};

export default ProductListPageContainer;
