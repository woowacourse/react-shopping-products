import React from 'react';
import ReactDOM from 'react-dom/client';

import { Global, ThemeProvider } from '@emotion/react';
import theme from './styles/theme.ts';
import globalStyles from './styles/globalStyles.ts';
import AppRouter from './router/AppRouter.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Global styles={globalStyles()} />
        <AppRouter />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
