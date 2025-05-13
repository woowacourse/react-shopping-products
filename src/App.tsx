import { Global, ThemeProvider } from '@emotion/react';
import { GlobalStyle, theme } from './style';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Global styles={GlobalStyle} />
        <h1>React Shopping Products</h1>
      </ThemeProvider>
    </>
  );
}

export default App;
