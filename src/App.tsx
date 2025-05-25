import { Global, ThemeProvider } from '@emotion/react';
import MobileLayout from './components/common/MobileLayout';
import { CartProvider } from './components/features/cart/context';
import reset from './global/style/reset';
import { theme } from './global/style/theme';
import ShopPage from './pages/shop/ShopPage';

function App() {
  return (
    <>
      <Global styles={reset} />
      <MobileLayout>
        <ThemeProvider theme={theme}>
          <CartProvider>
            <ShopPage />
          </CartProvider>
        </ThemeProvider>
      </MobileLayout>
    </>
  );
}

export default App;
