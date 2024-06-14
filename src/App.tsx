import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ProductListPage from './pages/ProductListPage/ProductListPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
      retry: 3,
    },
  },
});
const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ProductListPage />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default App;
