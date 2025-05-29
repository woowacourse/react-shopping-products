import { ProductListPage } from './features/ProductList/pages/ProductList';
import { ShoppingDataProvider } from './shared/context/ShoppingDataProvider';
import { ToastProvider } from './shared/context/ToastProvider';

export const App = () => {
  return (
    <ToastProvider>
      <ShoppingDataProvider>
        <ProductListPage />
      </ShoppingDataProvider>
    </ToastProvider>
  );
};
