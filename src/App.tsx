import { Global, ThemeProvider } from '@emotion/react';
import MobileLayout from './components/common/MobileLayout';
import { APIDataProvider } from './context/APIDataProvider';
import reset from './global/style/reset';
import { theme } from './global/style/theme';
import ShopPage from './pages/shop/ShopPage';
import { ToastProvider } from './context/ToastProvider';

function App() {
  return (
    <>
      <Global styles={reset} />
      <ThemeProvider theme={theme}>
        <MobileLayout>
          <ToastProvider>
            <APIDataProvider>
              <ShopPage />
            </APIDataProvider>
          </ToastProvider>
        </MobileLayout>
      </ThemeProvider>
    </>
  );
}

export default App;
