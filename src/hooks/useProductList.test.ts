import { HttpResponse, http } from 'msw';
import { renderHook, waitFor } from '@testing-library/react';

import { ENDPOINT } from '@/api/endpoints';
import { act } from 'react';
import { server } from '@/mocks/server';
import useProductList from '@/hooks/useProductList';

describe('useProductList', () => {
  describe('상품 목록 조회', () => {
    it('상품 목록을 조회한다.', async () => {
      const { result } = renderHook(() => useProductList());

      await waitFor(() => {
        expect(result.current.products).toHaveLength(20);
      });
    });

    it('상품 목록 조회 전 로딩 상태를 가진다.', async () => {
      const { result } = renderHook(() => useProductList());

      expect(result.current.loading).toBe(true);
    });

    it('상품 목록 조회 중 에러 발생시 에러 상태를 가진다.', async () => {
      server.use(
        http.get(ENDPOINT.product.getList({}), () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      const { result } = renderHook(() => useProductList());

      await waitFor(() => {
        expect(result.current.products).toEqual([]);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeTruthy();
      });
    });
  });

  describe('페이지네이션', () => {
    it('초기 랜더링시 첫 페이지의 상품 20개를 불러온다.', async () => {
      const { result } = renderHook(() => useProductList());

      await waitFor(() => {
        expect(result.current.page).toBe(0);
        expect(result.current.products).toHaveLength(20);
      });
    });

    it('스크롤 다운 시 다음 페이지의 상품 4개를 불러온다.', async () => {
      const { result } = renderHook(() => useProductList());

      await waitFor(() => {
        expect(result.current.page).toBe(0);
        expect(result.current.products).toHaveLength(20);
      });

      act(() => {
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.page).toBe(1);
        expect(result.current.products).toHaveLength(24);
      });
    });

    it('마지막 페이지일 시 다음 페이지가 존재하지 않는다고 알려준다.', async () => {
      const { result } = renderHook(() => useProductList());

      await waitFor(() => {
        expect(result.current.page).toBe(0);
        expect(result.current.products).toHaveLength(20);
        expect(result.current.hasNextPage).toBe(true);
      });

      act(() => {
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.page).toBe(1);
        expect(result.current.products).toHaveLength(24);
        expect(result.current.hasNextPage).toBe(false);
      });

      act(() => {
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(24);
        expect(result.current.hasNextPage).toBe(false);
      });
    });

    it('페이지네이션으로 추가 데이터를 불러올 때 로딩 상태를 표시한다.', async () => {
      const { result } = renderHook(() => useProductList());

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
