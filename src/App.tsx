import { Global, ThemeProvider } from '@emotion/react';
import { GlobalStyle, theme } from './style';
import ShoppingList from './page/ShoppingList';
import ToastProvider from './component/@common/Toast/context';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={GlobalStyle} />
      <DataProvider>
        <ToastProvider>
          <ShoppingList />
        </ToastProvider>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;
