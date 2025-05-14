import { Global, ThemeProvider } from '@emotion/react';
import { GlobalStyle, theme } from './style';
import ShoppingList from './page/ShoppingList';
import ToastProvider from './component/@common/Toast/context';
import Toast from './component/@common/Toast';
import { useToast } from './component/@common/Toast/context';

export type SortOption = '높은 가격순' | '낮은 가격순';

const AppContent = () => {
  const { isVisible } = useToast();

  return (
    <>
      <ShoppingList />
      {isVisible && <Toast />}
    </>
  );
};

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Global styles={GlobalStyle} />
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
