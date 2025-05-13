import { Global, ThemeProvider } from '@emotion/react';
import MobileLayout from './components/common/MobileLayout';
import ProductList from './components/features/product/product-list/ProductList';
import reset from './global/style/reset';
import { theme } from './global/style/theme';
import ShopHeader from './components/features/header/ShopHeader';

function App() {
  return (
    <MobileLayout>
      <Global styles={reset} />
      <ThemeProvider theme={theme}>
        <ShopHeader />
        <ProductList />
      </ThemeProvider>
    </MobileLayout>
  );
}

export default App;
