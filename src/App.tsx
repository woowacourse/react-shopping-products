import './reset.css';
import './index.css';

import ProductPage from './page/ProductPage';
import { QueryClientProvider } from '@tanstack/react-query';
import { useToast } from './hooks/useToast';
import createQueryClient from './queryClient';

function App() {
  const { createToast } = useToast();
  const queryClient = createQueryClient(createToast);

  return (
    <QueryClientProvider client={queryClient}>
      <ProductPage />
    </QueryClientProvider>
  );
}

export default App;
