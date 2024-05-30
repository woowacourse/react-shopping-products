import { renderHook, waitFor, act } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import { Category, SortOrder } from '../../../entities/product/index';
import { ALL } from '../../../features/product/index';
import { PRODUCTS_ENDPOINT } from '../../../shared/index';
import { server } from '../../../shared/mocks/server';

import useProducts from './useProducts';

describe('useProducts', () => {
  describe('상품 목록 조회', () => {
    it('상품 목록을 조회한다.', async () => {
      const { result } = renderHook(() => useProducts());
      await waitFor(() => {
        expect(result.current.products).toHaveLength(20);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
      });
    });

    it('상품 목록 조회 중 로딩 상태', () => {
      const { result } = renderHook(() => useProducts());
      expect(result.current.loading).toBe(true);
    });

    it('상품 목록 조회 중 에러 상태', async () => {
      server.use(http.get(PRODUCTS_ENDPOINT, () => new HttpResponse(null, { status: 500 })));
      const { result } = renderHook(() => useProducts());
      await waitFor(() => {
        expect(result.current.products).toEqual([]);
        expect(result.current.error).toBeTruthy();
      });
    });
  });

  describe('페이지네이션', () => {
    it('초기에 첫 페이지의 상품 20개를 불러온다', async () => {
      const { result } = renderHook(() => useProducts());
      await waitFor(() => {
        expect(result.current.products).toHaveLength(20);
      });
    });

    it('다음 페이지의 상품 4개를 추가로 불러온다', async () => {
      const { result } = renderHook(() => useProducts());
      await waitFor(() => {
        expect(result.current.products).toHaveLength(20);
      });
      act(() => result.current.fetchNextPage());
      await waitFor(() => {
        expect(result.current.products).toHaveLength(24);
      });
    });

    it('모든 페이지의 상품을 불러오면 더 이상 요청하지 않는다.', async () => {
      const { result } = renderHook(() => useProducts());
      await waitFor(() => {
        expect(result.current.products).toHaveLength(20);
      });
      for (let i = 1; i < 21; i++) {
        act(() => result.current.fetchNextPage());
        const expectedLength = 20 + i * 4;
        await waitFor(() => {
          expect(result.current.products).toHaveLength(expectedLength);
        });
      }
      act(() => result.current.fetchNextPage());
      await waitFor(() => {
        expect(result.current.products).toHaveLength(100);
      });
    });

    it('페이지네이션으로 추가 데이터를 불러올 때 로딩 상태를 표시한다.', async () => {
      const { result } = renderHook(() => useProducts());
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });
      act(() => result.current.fetchNextPage());
      expect(result.current.loading).toBe(true);
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });
    });
  });

  describe('필터링 및 정렬', () => {
    it.each([
      ['Electronics', 'electronics'],
      ['Books', 'books'],
    ])('카테고리 %s 별로 필터링하여 조회한다.', async (_, category) => {
      const { result } = renderHook(() => useProducts());
      act(() => result.current.handleChangeCategory(category as typeof ALL | Category));
      await waitFor(() => {
        expect(result.current.products).toHaveLength(20);
        expect(result.current.products[0].category).toBe(category);
      });
    });

    it.each([
      ['낮은 가격 순', 'asc', 89],
      ['높은 가격 순', 'desc', 999],
    ])('상품 목록을 %s 별로 정렬하여 조회한다.', async (_, sortOrder, price) => {
      const { result } = renderHook(() => useProducts());
      act(() => result.current.handleChangeSortOrder(sortOrder as SortOrder));
      await waitFor(() => {
        expect(result.current.products[0].price).toBe(price);
      });
    });
  });
});
