import { Global, ThemeProvider } from '@emotion/react';
import { GlobalStyle, theme } from './style';
import Header from './component/@common/Header/Header';
import ShoppingList from './page/ShoppingList/ShoppingList';
import ToastProvider from './component/@common/Toast/context/toastProvider';
import Toast from './component/@common/Toast/Toast';
import CartProvider from './context/cartContext/cartProvider';

export type SortOption = '높은 가격순' | '낮은 가격순';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Global styles={GlobalStyle} />
        <ToastProvider>
          <CartProvider>
            <Header />
            <ShoppingList />
            <Toast />
          </CartProvider>
        </ToastProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
