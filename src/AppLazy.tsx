import { lazy } from 'react';
import { ProductsWithCartProvider } from './shared/contexts/productsWithCart/ProductsWithCartProvider';
import { TempCartProvider } from './features/cart/contexts/TempCartProvider';

const App = lazy(() => import('./App'));

function LazyApp() {
  return (
    <ProductsWithCartProvider>
      <TempCartProvider>
        <App />
      </TempCartProvider>
    </ProductsWithCartProvider>
  );
}

export default LazyApp;
