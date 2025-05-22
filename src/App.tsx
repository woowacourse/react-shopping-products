import { Global, ThemeProvider } from '@emotion/react';
import MobileLayout from './components/common/MobileLayout';
import { APIDataProvider } from './context/APIDataProvider';
import reset from './global/style/reset';
import { theme } from './global/style/theme';
import ShopPage from './pages/shop/ShopPage';

function App() {
  return (
    <>
      <Global styles={reset} />
      <ThemeProvider theme={theme}>
        <MobileLayout>
          <APIDataProvider>
            <ShopPage />
          </APIDataProvider>
        </MobileLayout>
      </ThemeProvider>
    </>
  );
}

export default App;
