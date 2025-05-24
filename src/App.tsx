import { Global, ThemeProvider } from '@emotion/react';
import MobileLayout from './components/common/MobileLayout';
import CartProvider from './context/CartProvider';
import reset from './global/style/reset';
import { theme } from './global/style/theme';
import ShopPage from './pages/shop/ShopPage';
import { ShopErrorProvider } from './pages/shop/context';

function App() {
  return (
    <>
      <Global styles={reset} />
      <MobileLayout>
        <ThemeProvider theme={theme}>
          <ShopErrorProvider>
            <CartProvider>
              <ShopPage />
            </CartProvider>
          </ShopErrorProvider>
        </ThemeProvider>
      </MobileLayout>
    </>
  );
}

export default App;
