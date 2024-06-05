import useProductList, { PAGE } from './useProductList';
import { waitFor, renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

let queryClient: any;
let wrapper: any;

beforeEach(() => {
  queryClient = new QueryClient();
  wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
});

describe('useProductList', () => {
  describe('페이지네이션', () => {
    it(`첫 페이지는 ${PAGE.START_SIZE}개의 상품 목록을 불러온다.`, async () => {
      const { result } = renderHook(() => useProductList(), { wrapper });

      await act(() => result.current.fetchNextPage());

      await waitFor(() => {
        expect(result.current.data).toHaveLength(PAGE.START_SIZE);
      });
    });

    it(`이후 페이지는 ${PAGE.SIZE}개의 상품 목록을 불러온다.`, async () => {
      const { result } = renderHook(() => useProductList(), { wrapper });

      await act(() => {
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.data).toHaveLength(PAGE.START_SIZE);
      });

      await act(() => result.current.fetchNextPage());

      await waitFor(() => {
        expect(result.current.data).toHaveLength(PAGE.START_SIZE + PAGE.SIZE);
      });
    });
  });

  describe('상품 목록 조회', () => {
    it('상품 목록을 조회한다.', async () => {
      const { result } = renderHook(() => useProductList(), { wrapper });

      act(() => {
        result.current.fetchNextPage(); // 대괄호로 묶어주지 않으면 오류발생
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      await waitFor(() => {
        expect(result.current.data).toHaveLength(PAGE.START_SIZE);
      });
    });

    it('상품 목록 조회가 끝나면 로딩 상태도 끝난다.', async () => {
      const { result } = renderHook(() => useProductList(), { wrapper });

      await act(() => result.current.fetchNextPage());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });
  });
});
