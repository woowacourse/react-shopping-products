import { Global, ThemeProvider } from '@emotion/react';
import ProductList from './components/features/product/product-list/ProductList';
import reset from './global/style/reset';
import { theme } from './global/style/theme';

function App() {
  return (
    <>
      <Global styles={reset} />
      <ThemeProvider theme={theme}>
        <ProductList />
      </ThemeProvider>
    </>
  );
}

export default App;
