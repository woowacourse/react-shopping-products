import React from 'react';
import { ToastContextProvider } from '../../src/context/ToastContextProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import { useToast } from '../../src/hooks/useToast';
import createQueryClient from '../../src/queryClient.ts';

export const wrapper = ({ children }) => {
  return (
    <ToastContextProvider>
      <QueryProvider>{children}</QueryProvider>
    </ToastContextProvider>
  );
};

const QueryProvider = ({ children }) => {
  const { createToast } = useToast();
  const queryClient = createQueryClient(createToast);
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
