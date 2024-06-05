import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import React from 'react';
import useProducts from '../../src/hooks/product/useProducts/useProducts';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export const createProductsRenderHook = () =>
  renderHook(() => useProducts(), {
    wrapper,
  });
