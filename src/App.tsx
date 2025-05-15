import { ProductList } from './features/ProductList/ProductList';
import { ToastProvider } from './shared/context/ToastProvider';

export const App = () => {
  return (
    <ToastProvider>
      <ProductList />
    </ToastProvider>
  );
};
