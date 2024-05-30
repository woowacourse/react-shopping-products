import { CartProvider } from './contexts/CartContext';
// CartContext 경로에 맞게 수정
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
