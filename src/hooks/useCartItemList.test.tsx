import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';

import { server } from '../mocks/server';
import { END_POINTS, QUERY_KEYS } from '../apis/config';
import { CartItemList, CartItemListResponse } from '../types/type';

import useCartItemList from './useCartItemList';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useCartItemList', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  describe('장바구니 목록 조회', () => {
    it('장바구니 아이템을 가져와야 한다', async () => {
      const { result } = renderHook(() => useCartItemList(), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      const afterData: CartItemListResponse =
        queryClient.getQueryData([QUERY_KEYS.CART_ITEMS]) ??
        ({ content: [] as CartItemList } as CartItemListResponse);
      await waitFor(() => {
        expect(afterData.content).not.toBeUndefined();
      });
    });

    it('장바구니 목록 조회 중 로딩 상태', () => {
      const { result } = renderHook(() => useCartItemList(), { wrapper });

      expect(result.current.isFetching).toBe(true);
    });

    it('장바구니 목록 조회 중 에러 상태', async () => {
      server.use(
        http.get(
          END_POINTS.PRODUCTS,
          () => new HttpResponse(null, { status: 500 }),
        ),
      );

      const { result } = renderHook(() => useCartItemList(), { wrapper });
      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });
    });
  });
});
