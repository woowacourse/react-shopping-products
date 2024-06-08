import { CartProvider } from './contexts/CartContext';
import Products from '@/pages/Products';

import baseStyle from '@/styles/base.style';
import { Global } from '@emotion/react';
function App() {
  return (
    <>
      <Global styles={baseStyle} />
      <CartProvider>
        <Products />
      </CartProvider>
    </>
  );
}

export default App;
