import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Product from './pages/Product';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Product />
    </QueryClientProvider>
  );
}

export default App;
