import { Global } from '@emotion/react';
import ProductsProvider from './pages/ProductsProvider';
import baseStyle from '@/style/base.style';

function App() {
  return (
    <>
      <Global styles={baseStyle} />
      <ProductsProvider />
    </>
  );
}

export default App;
