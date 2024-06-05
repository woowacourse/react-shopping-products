import { ErrorProvider } from '@/contexts/ErrorContext';
import Products from './Products';
import { Suspense } from 'react';

const ProductsProvider = () => {
  return (
    <ErrorProvider>
      <Suspense>
        <Products />
      </Suspense>
    </ErrorProvider>
  );
};

export default ProductsProvider;
