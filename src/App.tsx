import ToastProvider from './components/common/toast/ToastProvider';
import ProductListPage from './pages/productListPage/ProductListPage';
import QueryProvider from './QueryProvider';

function App() {
  return (
    <ToastProvider>
      <QueryProvider>
        <ProductListPage />
      </QueryProvider>
    </ToastProvider>
  );
}

export default App;
