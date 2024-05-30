import { CartProvider } from '@/contexts/CartContext';
import { Global } from '@emotion/react';
import Products from '@/pages/Products';
import baseStyle from '@/style/base.style';

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
