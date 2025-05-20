import { Global, ThemeProvider } from '@emotion/react';
import { GlobalStyle, theme } from './style';
import ShoppingList from './page/ShoppingList';
import ToastProvider from './component/@common/Toast/context';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={GlobalStyle} />
      <ToastProvider>
        <ShoppingList />
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
