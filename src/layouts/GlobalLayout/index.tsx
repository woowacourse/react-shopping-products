import * as S from './style';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContext } from '../../context/ToastProvider';

import { PropsWithChildren, useContext } from 'react';

const GlobalLayout = ({ children }: PropsWithChildren) => {
  const { showToast } = useContext(ToastContext);

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => showToast(error.message),
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>
      <S.Container>{children}</S.Container>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default GlobalLayout;
