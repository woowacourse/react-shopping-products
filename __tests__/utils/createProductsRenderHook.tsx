import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import React from 'react';
import useProductWithPagination from '../../src/hooks/product/useProductsWithPagination/useProductsWithPagination';
import useSelectProductDropdown from '../../src/hooks/product/useSelectProductDropdown';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

export const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export const createProductsRenderHook = () =>
  renderHook(
    () => {
      const { dropdownOptions, onSelectOption } = useSelectProductDropdown();
      const result = useProductWithPagination({ dropdownOptions, showToast: () => {} });

      return { ...result, dropdownOptions, onSelectOption };
    },
    {
      wrapper,
    }
  );
