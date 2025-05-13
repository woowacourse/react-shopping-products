import { Global, ThemeProvider } from '@emotion/react';
import { theme } from './global/style/theme';
import reset from './global/style/reset';
import ProductCard from './components/features/product/product-card/ProductCard';

function App() {
  return (
    <>
      <Global styles={reset} />
      <ThemeProvider theme={theme}>
        <ProductCard />
      </ThemeProvider>
    </>
  );
}

export default App;
