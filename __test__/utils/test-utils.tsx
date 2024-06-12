import React from 'react';
import { ToastContextProvider } from '../../src/contexts/ToastContextProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const testQueryClient = new QueryClient();

export const queryClientWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>
);

export const combinedContextWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <ToastContextProvider>
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  </ToastContextProvider>
);
