import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

import CartItemProvider from '@/CartItemProvider';
import { ToastContext } from '@/context/toast';

const MockWrapper = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <ToastContext.Provider value={{ isShow: false, error: () => {} }}>
      <QueryClientProvider client={queryClient}>
        <CartItemProvider>{children}</CartItemProvider>
      </QueryClientProvider>
    </ToastContext.Provider>
  );
};

export default MockWrapper;
