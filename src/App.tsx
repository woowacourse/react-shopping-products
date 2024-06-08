import './reset.css';
import ProductListPageContainer from './pages/ProductListPageContainer';
import ToastProvider from './hooks/useToast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Layout from './components/Layout/Layout';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import ScrollToTopButton from './components/common/ScrollTopButton/ScrollTopButton';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider theme={theme}>
        <Layout>
          <ToastProvider>
            <ProductListPageContainer />
          </ToastProvider>
          <ScrollToTopButton />
        </Layout>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
