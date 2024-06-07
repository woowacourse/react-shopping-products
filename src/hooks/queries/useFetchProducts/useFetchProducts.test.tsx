import { act, renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useFetchProducts from './useFetchProducts';
import products from '../../../mocks/product/products.json';
import { CATEGORY_LIST, SORTING_LIST } from '../../../constants/optionList';
import { SIZE } from '../../../constants/api';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useFetchProducts', () => {
  describe('상품 목록 조회', () => {
    it('상품 목록을 조회한다.', async () => {
      const { result } = renderHook(() => useFetchProducts(CATEGORY_LIST[0], SORTING_LIST[0]), { wrapper });

      await waitFor(() => expect(result.current.products).toHaveLength(SIZE.DEFAULT));
    });
  });

  describe('페이지네이션', () => {
    it('초기에 첫 페이지의 상품 20개를 불러온다', async () => {
      const { result } = renderHook(() => useFetchProducts(CATEGORY_LIST[0], SORTING_LIST[0]), { wrapper });

      await waitFor(() => expect(result.current.products).toHaveLength(SIZE.DEFAULT));
    });

    it('다음 페이지의 상품 4개를 추가로 불러온다', async () => {
      const { result } = renderHook(() => useFetchProducts(CATEGORY_LIST[0], SORTING_LIST[0]), { wrapper });

      act(() => {
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(SIZE.DEFAULT + SIZE.ADDITIONAL);
      });
    });

    it('모든 페이지의 상품을 불러오면 더 이상 요청하지 않는다.', async () => {
      queryClient.resetQueries();

      const { result } = renderHook(() => useFetchProducts(CATEGORY_LIST[0], SORTING_LIST[0]), { wrapper });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(SIZE.DEFAULT);
      });

      for (let i = 1; i < 20; i++) {
        await waitFor(() => {
          act(() => {
            result.current.fetchNextPage();
          });
        });

        const expectedLength = SIZE.DEFAULT + i * SIZE.ADDITIONAL;

        await waitFor(() => {
          expect(result.current.products).toHaveLength(expectedLength);
        });
      }

      await act(async () => result.current.fetchNextPage());

      await waitFor(() => expect(result.current.products).toHaveLength(products.length));
    });
  });
});
