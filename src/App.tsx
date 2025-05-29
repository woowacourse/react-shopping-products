import { ProductListPage } from './features/ProductList/pages/ProductList';
import { APIProvider } from './shared/context/APIContext';
import { ToastProvider } from './shared/context/ToastProvider';

export const App = () => {
  return (
    <ToastProvider>
      <APIProvider>
        <ProductListPage />
      </APIProvider>
    </ToastProvider>
  );
};
