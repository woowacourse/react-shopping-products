import { Global, ThemeProvider } from '@emotion/react';
import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GlobalLayout from '../layouts/GlobalLayout';
import { globalStyles } from '../globalStyle';
import theme from '../theme';

const queryClient = new QueryClient();

const wrapper = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <GlobalLayout>{children}</GlobalLayout>
    </ThemeProvider>
  </QueryClientProvider>
);

export default wrapper;
