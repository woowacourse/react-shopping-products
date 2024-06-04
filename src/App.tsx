import { useState } from 'react';

import Header from './components/Header/Header';
import Product from './pages/Product';
import GlobalStyles from './styles/Global.style';
import Toast from './components/common/Toast/Toast';
import { QuantityContext } from './store/QuantityContext';
import { ErrorContext } from './store/ErrorContext';
import { CartItemListProvider } from './store/CartItemListContext';

function App() {
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState<Error | null>(null);

  return (
    <>
      <GlobalStyles />
      <ErrorContext.Provider value={{ error, setError }}>
        <Toast />
        <QuantityContext.Provider value={{ quantity, setQuantity }}>
          <CartItemListProvider>
            <Header />
            <Product />
          </CartItemListProvider>
        </QuantityContext.Provider>
      </ErrorContext.Provider>
    </>
  );
}

export default App;
