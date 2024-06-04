import { CartProvider } from '@/contexts/CartContext';
import { ErrorProvider } from '@/contexts/ErrorContext';
import Products from './Products';
import { Suspense } from 'react';

const ProductsProvider = () => {
  return (
    <ErrorProvider>
      <CartProvider>
        <Suspense>
          <Products />
        </Suspense>
      </CartProvider>
    </ErrorProvider>
  );
};

export default ProductsProvider;
