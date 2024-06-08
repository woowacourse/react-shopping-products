import { server } from '../src/mocks/server';
import { http, HttpResponse } from 'msw';
import useProducts from '../src/hooks/useProducts';
import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react';
import { wrapper } from './utils/test-utils';
import ENDPOINT from '../src/api/endpoints';

const renderUseProductsHook = () =>
  renderHook(() => useProducts(), { wrapper: wrapper });

describe('useProducts', () => {
  describe('상품 목록 조회', () => {
    it('상품 목록을 조회한다.', async () => {
      const { result } = renderUseProductsHook();

      await waitFor(() => {
        expect(result.current.products).toHaveLength(20);
      });
    });

    it('상품 목록 조회 중 fetch 상태', () => {
      const { result } = renderUseProductsHook();

      expect(result.current.isFetching).toBe(true);
    });

    it('상품 목록 조회 중 에러 상태', async () => {
      server.use(
        http.get(ENDPOINT.PRODUCTS, () => {
          return new HttpResponse(null, { status: 500 });
        }),
      );

      const { result } = renderUseProductsHook();

      await waitFor(() => {
        expect(result.current.products).toEqual([]);
        expect(result.current.isFetching).toBe(false);
        expect(result.current.error).toBeTruthy();
      });
    });
  });

  describe('페이지네이션', () => {
    it('초기에 첫 페이지의 상품 20개를 불러온다', async () => {
      const { result } = renderUseProductsHook();

      await waitFor(() => {
        expect(result.current.products).toHaveLength(20);
      });
    });

    it('다음 페이지의 상품 4개를 추가로 불러온다', async () => {
      const { result } = renderUseProductsHook();

      await waitFor(() => {
        expect(result.current.products).toHaveLength(20);
      });

      act(() => {
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(24);
      });
    });

    it('모든 페이지의 상품을 불러오면 더 이상 요청하지 않는다.', async () => {
      const { result } = renderUseProductsHook();

      await waitFor(() => {
        expect(result.current.products).toHaveLength(20);
      });

      for (let i = 1; i <= 3; i++) {
        await waitFor(() => {
          act(() => {
            result.current.fetchNextPage();
          });
        });

        const expectedLength = 20 + i * 4;

        await waitFor(() => {
          expect(result.current.products).toHaveLength(expectedLength);
        });
      }

      await act(async () => {
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(32);
      });
    });

    it('페이지네이션으로 추가 데이터를 불러올 때 fetch 상태를 표시한다.', async () => {
      const { result } = renderUseProductsHook();

      expect(result.current.isFetching).toBe(true);

      act(() => {
        result.current.fetchNextPage();
      });

      expect(result.current.isFetching).toBe(true);

      await waitFor(() => {
        expect(result.current.isFetching).toBe(false);
      });
    });
  });
});
