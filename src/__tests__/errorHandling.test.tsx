import { END_POINT } from '@/api/endpoints';
import useProductList from '@/hooks/useProductList';
import { server } from '@/mocks/server';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { HttpResponse, http } from 'msw';

describe('errorHandling', () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  const errorCases = [
    { status: 400, errorName: 'BAD_REQUEST_ERROR' },
    { status: 401, errorName: 'AUTHORIZED_ERROR' },
    { status: 404, errorName: 'NOT_FOUND_ERROR' },
    { status: 500, errorName: 'SERVER_ERROR' },
  ];

  it.each(errorCases)(
    '상품 목록을 불러올 때 status 가 $status 인 에러 발생 시 errorName 이 $errorName 여야 한다.',
    async ({ status }) => {
      server.use(
        http.get(END_POINT.products, () => {
          return new HttpResponse(null, { status: status });
        }),
      );
      const { result } = renderHook(() => useProductList(), { wrapper });

      await waitFor(() => {
        expect(result.current.productList).toEqual([]);
        expect(result.current.isLoading).toBeFalsy();
      });
    },
  );
});
