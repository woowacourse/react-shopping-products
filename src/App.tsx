import AppLayout from '@components/layout/AppLayout/AppLayout';
import { Global } from '@emotion/react';
import ProductPage from '@pages/ProductPage/ProductPage';
import { resetCSS } from '@styles/resetCSS';
import useToggleShoppingCart from '@hooks/product/useToggleShoppingCart';

function App() {
  const { addedShoppingCartLength: length, onToggleCart, isAddedCart } = useToggleShoppingCart();
  return (
    <>
      <Global styles={resetCSS} />
      <AppLayout itemCount={length}>
        <ProductPage onToggleCart={onToggleCart} isAddedCart={isAddedCart} />
      </AppLayout>
    </>
  );
}

export default App;
