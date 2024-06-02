import { CartProvider } from '@/contexts/CartContext';
import { ErrorProvider } from './contexts/ErrorContext';
import { Global } from '@emotion/react';
import Products from '@/pages/Products';
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
