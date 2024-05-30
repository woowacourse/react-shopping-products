import './reset.css';
import { CartItemListProvider } from './hooks/useCartItemList';
import ProductListPageContainer from './pages/ProductListPageContainer';
import ToastProvider from './hooks/useToast';

function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '472px' }}>
        <ToastProvider>
          <CartItemListProvider>
            <ProductListPageContainer />
          </CartItemListProvider>
        </ToastProvider>
      </div>
    </div>
  );
}

export default App;
