import { ProductListPage } from './features/ProductList/pages/ProductList';
import { ToastProvider } from './shared/context/ToastProvider';

export const App = () => {
  return (
    <ToastProvider>
      <ProductListPage />
    </ToastProvider>
  );
};
