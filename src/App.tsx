import { Global, ThemeProvider } from '@emotion/react';
import MobileLayout from './components/common/MobileLayout';
import reset from './global/style/reset';
import { theme } from './global/style/theme';
import ShopPage from './pages/shop/ShopPage';

function App() {
  return (
    <MobileLayout>
      <Global styles={reset} />
      <ThemeProvider theme={theme}>
        <ShopPage />
      </ThemeProvider>
    </MobileLayout>
  );
}

export default App;
