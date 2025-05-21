import { lazy } from 'react';
import { ProductsWithCartProvider } from './shared/contexts/productsWithCart/ProductsWithCartProvider';

const App = lazy(() => import('./App'));

function LazyApp() {
  return (
    <ProductsWithCartProvider>
      <App />
    </ProductsWithCartProvider>
  );
}

export default LazyApp;
