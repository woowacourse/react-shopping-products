import { Global, ThemeProvider } from '@emotion/react';
import { ReactNode } from 'react';
import GlobalLayout from '../../layouts/GlobalLayout';
import theme from '../../theme';
import { globalStyles } from '../../globalStyle';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface WrapperProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const wrapper = ({ children }: WrapperProps) => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <GlobalLayout>{children}</GlobalLayout>
    </ThemeProvider>
  </QueryClientProvider>
);

export default wrapper;
