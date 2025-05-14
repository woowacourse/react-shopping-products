import { Global, ThemeProvider } from '@emotion/react';
import { GlobalStyle, theme } from './style';
import ShoppingList from './page/ShoppingList';

export type SortOption = '높은 가격순' | '낮은 가격순';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Global styles={GlobalStyle} />
        <ShoppingList />
      </ThemeProvider>
    </>
  );
}

export default App;
