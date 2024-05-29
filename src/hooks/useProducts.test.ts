import { renderHook, waitFor } from '@testing-library/react';
import useProducts from './useProducts';
import { server } from '../mocks/server';
import { HttpResponse, http } from 'msw';
import { PRODUCTS_ENDPOINT } from '../api/endpoints';
import { act } from 'react';
import {
  FIRST_PAGE,
  FIRST_PAGE_SIZE,
  GAP_WITH_FIRST_PAGE,
  MOCK_PRODUCTS_LAST_PAGE,
  MOCK_PRODUCTS_TOTAL_SIZE,
  SIZE_PER_PAGE,
} from '../constants/pagination';
import { Category } from '../types/product';

describe('useProducts', () => {
  describe('첫 페이지 상품 목록 조회', () => {
    it(`첫 페이지에서는 상품 목록 ${FIRST_PAGE_SIZE}개를 조회한다.`, async () => {
      const { result } = renderHook(() => useProducts());

      await waitFor(() => {
        expect(result.current.products).toHaveLength(FIRST_PAGE_SIZE);
      });
    });

    it('상품 목록 조회 중 로딩 상태를 "true"로 세팅한다.', () => {
      const { result } = renderHook(() => useProducts());

      expect(result.current.loading).toBeTruthy();
    });

    it('상품 목록 조회 중 에러가 발생한다면 에러 상태를 "Error"로 세팅한다.', async () => {
      server.use(
        http.get(PRODUCTS_ENDPOINT, () => {
          return new HttpResponse(null, { status: 500 });
        }),
      );

      const { result } = renderHook(() => useProducts());

      await waitFor(() => {
        expect(result.current.products).toEqual([]);
        expect(result.current.loading).toEqual(false);
        expect(result.current.error).not.toBeNull();
      });
    });
  });

  describe('페이지네이션', () => {
    it(`첫 페이지 이후 다음 페이지의 상품 ${SIZE_PER_PAGE}개를 추가로 불러온다.`, async () => {
      const { result } = renderHook(() => useProducts());

      await waitFor(() => {
        expect(result.current.products).toHaveLength(FIRST_PAGE_SIZE);
        expect(result.current.page).toBe(FIRST_PAGE);
      });

      act(() => {
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(MOCK_PRODUCTS_LAST_PAGE);
        expect(result.current.page).toBe(FIRST_PAGE + GAP_WITH_FIRST_PAGE);
      });
    });

    it('모든 페이지의 상품을 불러오면 더 이상 요청하지 않는다.', async () => {
      const { result } = renderHook(() => useProducts());

      await waitFor(() => {
        expect(result.current.products).toHaveLength(FIRST_PAGE_SIZE);
      });

      for (let i = FIRST_PAGE + GAP_WITH_FIRST_PAGE; i <= MOCK_PRODUCTS_LAST_PAGE; i++) {
        await waitFor(() => {
          act(() => {
            result.current.fetchNextPage();
          });
        });

        const expectedLength = FIRST_PAGE_SIZE + (i - GAP_WITH_FIRST_PAGE + 1) * SIZE_PER_PAGE;

        await waitFor(() => {
          expect(result.current.products).toHaveLength(expectedLength);
          expect(result.current.page).toBe(i);
        });
      }

      await act(async () => {
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(MOCK_PRODUCTS_TOTAL_SIZE);
        expect(result.current.page).toBe(MOCK_PRODUCTS_LAST_PAGE);
      });
    });

    it('페이지네이션으로 추가 데이터를 불러올 때 로딩 상태를 "true"로 세팅한다.', async () => {
      const { result } = renderHook(() => useProducts());

      await waitFor(() => {
        expect(result.current.loading).toBeFalsy();
      });

      act(() => {
        result.current.fetchNextPage();
      });

      expect(result.current.loading).toBeTruthy();

      await waitFor(() => {
        expect(result.current.loading).toBeFalsy();
      });
    });

    it('페이지네이션으로 추가 데이터를 불러오는 중 에러가 발생한다면 에러 상태를 "Error"로 세팅하고 이전 페이지로 돌아간다.', async () => {
      const { result } = renderHook(() => useProducts());

      await waitFor(() => {
        expect(result.current.products).toHaveLength(20);
      });

      server.use(
        http.get(PRODUCTS_ENDPOINT, () => {
          return new HttpResponse(null, { status: 500 });
        }),
      );

      act(() => {
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.page).toBe(FIRST_PAGE);
        expect(result.current.products).toHaveLength(20);
        expect(result.current.loading).toEqual(false);
        expect(result.current.error).not.toBeNull();
      });
    });
  });

  describe('카테고리', () => {
    const CATEGORIES: Category[] = [
      'fashion',
      'beverage',
      'books',
      'electronics',
      'fitness',
      'kitchen',
    ];

    it.each(CATEGORIES)('카테고리가 "%s"인 상품만 불러온다.', async (selectedCategory: string) => {
      const { result } = renderHook(() => useProducts());

      await waitFor(() => {
        expect(
          result.current.products.every(({ category }) => category === selectedCategory),
        ).toBeFalsy();
      });

      act(() => {
        result.current.filterByCategory(selectedCategory);
      });

      await waitFor(() => {
        expect(
          result.current.products.length &&
            result.current.products.every(({ category }) => selectedCategory === category),
        ).toBeTruthy();
      });
    });
  });
});
