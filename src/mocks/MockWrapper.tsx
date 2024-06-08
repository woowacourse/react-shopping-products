import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

import cartItems from './cartItems.json';

import { CartItemsContext } from '@/context/cartItems';
import { ToastContext } from '@/context/toast';
import theme from '@/theme';
import { CartItemInfo } from '@/types/cartItem';
const MockWrapper = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const CartItemContextValue = {
    cartItems: cartItems as CartItemInfo[],
    matchCartItem: () => ({} as CartItemInfo),
    handleAddCartItem: () => {},
    handleDeleteCartItem: () => {},
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContext.Provider value={{ isShow: false, error: () => {} }}>
        <QueryClientProvider client={queryClient}>
          <CartItemsContext.Provider value={CartItemContextValue}>
            {children}
          </CartItemsContext.Provider>
        </QueryClientProvider>
      </ToastContext.Provider>
    </ThemeProvider>
  );
};

export default MockWrapper;
