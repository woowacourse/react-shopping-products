import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartItemProvider } from '../../context/CartItemProvider';
import { ToastProvider } from '../../context/ToastProvider';
import * as S from './style';

import { PropsWithChildren } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const GlobalLayout = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <CartItemProvider>
          <S.Container>{children}</S.Container>
        </CartItemProvider>
      </ToastProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default GlobalLayout;
