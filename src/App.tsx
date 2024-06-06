import AppLayout from '@components/layout/AppLayout/AppLayout';
import { Global } from '@emotion/react';
import useToggleShoppingCart from '@hooks/cartItem/useToggleShoppingCart';
import ProductPage from '@pages/ProductPage/ProductPage';
import { resetCSS } from '@styles/resetCSS';

function App() {
  const { cartItems, addedShoppingCartLength: itemCount, isAddedCart } = useToggleShoppingCart();
  return (
    <>
      <Global styles={resetCSS} />
      <AppLayout itemCount={itemCount}>
        <ProductPage cartItems={cartItems} isAddedCart={isAddedCart} />
      </AppLayout>
    </>
  );
}

export default App;
