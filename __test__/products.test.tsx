import React from 'react';
import server from './mocks/server';
import { HttpResponse, http } from 'msw';
import { act, renderHook, waitFor } from '@testing-library/react';
import { PRODUCTS_ENDPOINT } from '../src/api/endpoints';

import { SortOrder } from '../src/api/types';
import { Category } from '../src/types';

import useProducts from '../src/hooks/useProducts';
import { queryClient } from './mocks/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import APIError from '../src/api/apiError';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('상품 목록 테스트', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  describe('상품 목록 조회', () => {
    it('상품 목록을 조회한다.', async () => {
      const { result } = renderHook(() => useProducts(), { wrapper });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(20);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeNull();
      });
    });

    it('상품 목록 조회 중 로딩 상태', () => {
      const { result } = renderHook(() => useProducts(), { wrapper });

      expect(result.current.isLoading).toBe(true);
    });

    it('상품 목록 조회 중 에러 상태', async () => {
      server.use(
        http.get(PRODUCTS_ENDPOINT, () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      const { result } = renderHook(() => useProducts(), { wrapper });

      await waitFor(() => {
        const error = result.current.error as APIError;
        expect(result.current.products).toEqual([]);
        expect(error.statusCode).toBe(500);
      });
    });
  });

  describe('페이지네이션', () => {
    it('초기에 첫 페이지의 상품 20개를 불러온다', async () => {
      const { result } = renderHook(() => useProducts(), { wrapper });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(20);
      });
    });

    it('다음 페이지의 상품 4개를 추가로 불러온다', async () => {
      const { result } = renderHook(() => useProducts(), { wrapper });

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
      const { result } = renderHook(() => useProducts(), { wrapper });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(20);
      });

      for (let i = 1; i < 21; i++) {
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
        expect(result.current.products).toHaveLength(100);
      });
    });

    it('페이지네이션으로 추가 데이터를 불러올 때 로딩 상태를 표시한다.', async () => {
      const { result } = renderHook(() => useProducts(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      act(() => {
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });
  });

  describe('가격을 기준으로 정렬', () => {
    const sortOptions = [
      { option: 'asc', description: "'낮은 가격 순'으로 정렬되어야 한다." },
      {
        option: 'desc',
        description: "'높은 가격 순'으로 정렬되어야 한다.",
      },
    ];

    test.each(sortOptions)('$description', async ({ option }) => {
      const { result } = renderHook(() => useProducts(), { wrapper });

      act(() => {
        result.current.setSort(option as SortOrder);
      });

      await waitFor(() => {
        expect(result.current.products).toBeDefined();

        const prices = result.current.products.map((product) => product.price);
        const sortedPrices = [...prices].sort((a, b) =>
          option === 'asc' ? a - b : b - a
        );

        expect(prices).toEqual(sortedPrices);
      });
    });
  });

  describe('카테고리 기준으로 필터링', () => {
    const categories = [
      { category: '', expected: 20, description: '모든 아이템을 반환한다.' },
      {
        category: 'fashion',
        expected: 20,
        description: '카테고리가 fashion인 아이템을 반환한다.',
      },
      {
        category: 'beverage',
        expected: 1,
        description: '카테고리가 beverage인 아이템을 반환한다.',
      },
      {
        category: 'electronics',
        expected: 20,
        description: '카테고리가 electronics인 아이템을 반환한다.',
      },
      {
        category: 'kitchen',
        expected: 20,
        description: '카테고리가 kitchen인 아이템을 반환한다.',
      },
      {
        category: 'fitness',
        expected: 20,
        description: '카테고리가 fitness인 아이템을 반환한다.',
      },
      {
        category: 'books',
        expected: 19,
        description: '카테고리가 books인 아이템을 반환한다.',
      },
    ];
    test.each(categories)('$description', async ({ category, expected }) => {
      const { result } = renderHook(() => useProducts(), { wrapper });

      act(() => {
        result.current.setCategory(category as Category);
      });

      await waitFor(() => {
        expect(result.current.products).toBeDefined();

        if (category !== '') {
          expect(
            result.current.products.every(
              (product) => product.category === category
            )
          ).toBeTruthy();
        }

        expect(result.current.products).toHaveLength(expected);
      });
    });
  });
});
