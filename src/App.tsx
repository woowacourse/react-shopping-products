import { ProductListPage } from './features/ProductList/pages/ProductList';
import { DataProvider } from './shared/context/DataProvider';
import { ToastProvider } from './shared/context/ToastProvider';

export const App = () => {
  return (
    <ToastProvider>
      <DataProvider>
        <ProductListPage />
      </DataProvider>
    </ToastProvider>
  );
};
