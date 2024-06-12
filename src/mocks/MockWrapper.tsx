import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

import { ToastContext } from '@/context/toast';
import theme from '@/theme';

const MockWrapper = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <ToastContext.Provider value={{ isShow: false, error: () => {} }}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </ToastContext.Provider>
    </ThemeProvider>
  );
};

export default MockWrapper;
