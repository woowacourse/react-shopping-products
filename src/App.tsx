import ToastProvider from './components/common/toast/ToastProvider';
import ProductListPage from './pages/productListPage/ProductListPage';

function App() {
  return (
    <ToastProvider>
      <ProductListPage />
    </ToastProvider>
  );
}

export default App;
