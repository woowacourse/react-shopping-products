import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { act } from 'react';
import { ENDPOINTS_PRODUCTS } from '../api/endpoints';
import { server } from '../mocks/node';
import { mockProductsResponse } from '../mocks/products';
import { Product } from '../types/fetch';
import { SortingParam } from '../types/sort';
import useProducts from './useFetchProducts';
import { Category } from '../components/Dropdown/Dropdown';

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('fetchProducts', () => {
  it('상품 목록 첫 조회시에는 20개의 아이템을 가져온다.', async () => {
    const { result } = renderHook(
      () => useProducts({ options: { retryDelay: 0 } }),
      {
        wrapper,
      },
    );

    act(() => {
      result.current.fetchNext();
    });

    await waitFor(
      () => {
        expect(result.current.isPending).toBe(false);
        expect(result.current.data?.pages[0].content).toHaveLength(20);
      },
      { timeout: 1000 },
    );
  });

  it('상품 목록 조회 시 에러', async () => {
    server.use(
      http.get(
        ENDPOINTS_PRODUCTS,
        () => new HttpResponse(null, { status: 500 }),
      ),
    );

    const { result } = renderHook(
      () => useProducts({ options: { retryDelay: 0 } }),
      {
        wrapper,
      },
    );

    act(() => {
      result.current.fetchNext();
    });

    await waitFor(
      () => {
        expect(result.current.isError).toBe(true);
      },
      { timeout: 5000 },
    );
  });

  it('첫 상품목록 조회 이후부터는, 이전 결과에 이어 4개씩 아이템을 추가하여 가져온다.', async () => {
    const { result } = renderHook(
      () => useProducts({ options: { retryDelay: 0 } }),
      {
        wrapper,
      },
    );

    act(() => {
      result.current.fetchNext();
    });
    await waitFor(() => {
      expect(result.current.data?.pages).toHaveLength(1);
      expect(result.current.data?.pages[0].content).toHaveLength(20);
      expect(result.current.products).toHaveLength(20);
    });

    act(() => {
      result.current.fetchNext();
    });

    await waitFor(() => {
      expect(result.current.data?.pages).toHaveLength(2);
      expect(result.current.data?.pages[1].content).toHaveLength(4);
      expect(result.current.products).toHaveLength(24);
    });
  });

  it('마지막 페이지 도달 시 더 이상 요청하지 않는다.', async () => {
    const { result } = renderHook(
      () => useProducts({ options: { retryDelay: 0 } }),
      {
        wrapper,
      },
    );
    const LAST_PAGE_IN_MOCK = 20;

    act(() => {
      result.current.fetchNext();
    });
    await waitFor(() => {
      expect(result.current.data?.pageParams.length).toBe(1);
      expect(result.current.data?.pages[0].content).toHaveLength(20);
    });

    for (let i = 1; i <= LAST_PAGE_IN_MOCK; i++) {
      act(() => {
        result.current.fetchNext();
      });

      await waitFor(
        () => {
          expect(result.current.data?.pageParams.length).toBe(i + 1);
          expect(result.current.data?.pages[i].content).toHaveLength(4);
        },
        { interval: 3 },
      );
    }

    act(() => {
      result.current.fetchNext();
    });

    await waitFor(() => {
      expect(result.current.data?.pageParams.length).toBe(
        LAST_PAGE_IN_MOCK + 1,
      );
    });
    act(() => {
      result.current.fetchNext();
    });
  });

  test.each([
    [
      [{ name: 'id', order: 'desc' }] as SortingParam[],
      [(a: Product, b: Product) => b.id - a.id],
    ],
    [
      [{ name: 'id', order: 'asc' }] as SortingParam[],
      [(a: Product, b: Product) => a.id - b.id],
    ],
    [
      [{ name: 'name', order: 'asc' }] as SortingParam[],
      [(a: Product, b: Product) => a.name.localeCompare(b.name)],
    ],
    [
      [
        { name: 'name', order: 'asc' },
        { name: 'id', order: 'desc' },
      ] as SortingParam[],
      [
        (a: Product, b: Product) => a.name.localeCompare(b.name),
        (a: Product, b: Product) => b.id - a.id,
      ],
    ],
  ])(
    '정렬 기준이 %s일 때 정렬된 결과가 나와야 한다.',
    async (
      sortings: SortingParam[],
      sortingFuncs: ((a: Product, b: Product) => number)[],
    ) => {
      const { result } = renderHook(
        () => useProducts({ sortings, options: { retryDelay: 0 } }),
        { wrapper },
      );

      const mockProducts = mockProductsResponse.content;
      sortingFuncs.forEach((sortingFunc) => {
        mockProducts.sort(sortingFunc);
      });
      const SORTED_MOCK_PRODUCTS = mockProducts.slice(0, 20);

      await waitFor(() => {
        expect(result.current.data?.pages[0].content).toHaveLength(20);
        expect(result.current.data?.pages[0].content).toEqual(
          SORTED_MOCK_PRODUCTS,
        );
      });
    },
  );

  test.each([['fashion'], ['electronics']] as Category[][])(
    '필터가 %s 일 때 필터링 된 결과가 나와야 한다.',
    async (category) => {
      const { result } = renderHook(
        () => useProducts({ filter: category, options: { retryDelay: 0 } }),
        { wrapper },
      );

      const mockProducts = mockProductsResponse.content;
      const filteredMockProducts = mockProducts.filter(
        (product) => product.category === category,
      );
      const FILTERED_MOCK_PRODUCTS = filteredMockProducts.slice(0, 20);

      await waitFor(() => {
        expect(result.current.data?.pages).toHaveLength(1);
        expect(result.current.data?.pages[0].content).toHaveLength(20);
        expect(result.current.data?.pages[0].content).toStrictEqual(
          FILTERED_MOCK_PRODUCTS,
        );
      });
    },
  );
});
