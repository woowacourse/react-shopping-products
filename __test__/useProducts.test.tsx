import { server } from '../src/mocks/server';
import { http, HttpResponse } from 'msw';
import { PRODUCTS_ENDPOINT } from '../src/api/endpoints';
import useProducts from '../src/hooks/useProducts';
import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react';
import { wrapper } from './utils/test-utils';

const renderUseProductsHook = () =>
  renderHook(() => useProducts(), { wrapper: wrapper });

describe('useProducts', () => {
  describe('상품 목록 조회', () => {
    it('상품 목록을 조회하면 처음에는 20개의 상품이 반환된다 ', async () => {
      const { result } = renderUseProductsHook();

      await waitFor(() => {
        expect(result.current.products).toHaveLength(20);
      });
    });

    it('상품 목록 조회 중 로딩 상태', () => {
      const { result } = renderUseProductsHook();
      expect(result.current.loading).toBe(true);
    });

    it('상품 목록 조회 중 에러 상태', async () => {
      server.use(
        http.get(PRODUCTS_ENDPOINT, () => {
          return new HttpResponse(null, { status: 500 });
        }),
      );

      const { result } = renderUseProductsHook();

      await waitFor(() => {
        expect(result.current.products).toEqual([]);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeTruthy();
      });
    });
  });

  describe('페이지네이션', () => {
    it('초기에 첫 페이지의 상품 20개를 불러온다', async () => {
      const { result } = renderUseProductsHook();

      await waitFor(() => {
        expect(result.current.products).toHaveLength(20);
        expect(result.current.page).toBe(0);
      });
    });

    it('다음 페이지의 상품 4개를 추가로 불러온다', async () => {
      const { result } = renderUseProductsHook();

      await waitFor(() => {
        expect(result.current.products).toHaveLength(20);
        expect(result.current.page).toBe(0);
      });

      act(() => {
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(24);
        expect(result.current.page).toBe(5);
      });
    });

    it('모든 페이지의 상품을 불러오면 더 이상 요청하지 않는다.', async () => {
      const { result } = renderUseProductsHook();

      await waitFor(() => {
        expect(result.current.products).toHaveLength(20);
      });

      for (let i = 5; i < 25; i++) {
        await waitFor(() => {
          act(() => {
            result.current.fetchNextPage();
          });
        });

        const expectedLength = 20 + (i - 4) * 4;

        await waitFor(() => {
          expect(result.current.products).toHaveLength(expectedLength);
          expect(result.current.page).toBe(i);
        });
      }

      await act(async () => {
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(100);
        expect(result.current.page).toBe(24);
      });
    });

    it('페이지네이션으로 추가 데이터를 불러올 때 로딩 상태를 표시한다.', async () => {
      const { result } = renderUseProductsHook();

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      act(() => {
        result.current.fetchNextPage();
      });

      expect(result.current.loading).toBe(true);

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });
    });
  });
});
