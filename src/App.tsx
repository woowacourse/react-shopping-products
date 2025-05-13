import { Global, ThemeProvider } from '@emotion/react';
import { theme } from './global/style/theme';
import ProductCard from './ProductCard';
import reset from './global/style/reset';

function App() {
  return (
    <>
      <Global styles={reset} />
      <ThemeProvider theme={theme}>
        <h1>React Shopping Products</h1>
        <ProductCard />
      </ThemeProvider>
    </>
  );
}

export default App;
