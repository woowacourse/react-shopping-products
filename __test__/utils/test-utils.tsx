import React from 'react';
import { ToastContextProvider } from '../../src/context/ToastContextProvider';
import { CartProvider } from '../../src/context/ShoppingCartContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const wrapper = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContextProvider>
        <CartProvider>{children}</CartProvider>
      </ToastContextProvider>
    </QueryClientProvider>
  );
};
