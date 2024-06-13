import { act, renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useProducts from '../queries/useProducts';
import {
  AFTER_FETCH_SIZE,
  FIRST_FETCH_SIZE,
  productCategories,
  sortOptions,
} from '../../constant/products';
import { ToastProvider } from '@/context/ToastProvider';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <ToastProvider>{children}</ToastProvider>
  </QueryClientProvider>
);

describe('useProducts 훅 테스트', () => {
  beforeEach(() => {
    queryClient.clear();
  });
  it('상품 목록을 가져올 수 있다', async () => {
    const selectBarCondition = {
      category: 'all',
      sort: 'priceAsc',
    };
    const { result } = renderHook(() => useProducts({ selectBarCondition }), { wrapper });

    await waitFor(() => {
      expect(result.current.isProductsQuerySuccess).toBe(true);
      expect(result.current.products).toHaveLength(FIRST_FETCH_SIZE);
    });
  });

  it(`다음 페이지 상품 ${AFTER_FETCH_SIZE}개를 불러온다.`, async () => {
    const selectBarCondition = {
      category: 'all',
      sort: 'priceAsc',
    };
    const { result } = renderHook(() => useProducts({ selectBarCondition }), { wrapper });

    await waitFor(() => expect(result.current.isProductsQuerySuccess).toBe(true));

    act(() => {
      result.current.fetchNextPage();
    });

    await waitFor(() => {
      expect(result.current.isProductsQuerySuccess).toBe(true);
      expect(result.current.products).toHaveLength(FIRST_FETCH_SIZE + AFTER_FETCH_SIZE);
    });
  });

  it('모든 페이지의 상품을 불러오면 더 이상 요청하지 않는다.', async () => {
    const selectBarCondition = {
      category: 'all',
      sort: 'priceAsc',
    };
    const { result } = renderHook(() => useProducts({ selectBarCondition }), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isProductsQuerySuccess).toBe(true);
      expect(result.current.products).toHaveLength(FIRST_FETCH_SIZE);
    });

    for (let i = 1; i < 21; i++) {
      act(() => {
        result.current.fetchNextPage();
      });

      const expectedLength = FIRST_FETCH_SIZE + i * AFTER_FETCH_SIZE;

      await waitFor(async () => {
        expect(result.current.products).toHaveLength(expectedLength);
      });
    }

    act(() => {
      result.current.fetchNextPage();
    });

    await waitFor(() => expect(result.current.isProductsQuerySuccess).toBe(true));
    expect(result.current.products).toHaveLength(100);
  });

  describe('상품 필터링 기능 테스트', () => {
    // 'all' 카테고리 제외
    it.each(Object.keys(productCategories).slice(1))(
      '카테고리 "%s"으로 요청하면 해당 카테고리 상품만을 요청한다',
      async (category) => {
        const selectBarCondition = {
          category: category,
          sort: 'priceAsc',
        };

        const { result } = renderHook(() => useProducts({ selectBarCondition }), {
          wrapper,
        });

        await waitFor(() => {
          expect(result.current.isProductsQuerySuccess).toBe(true);
          result.current.products?.forEach((product) => {
            expect(product.category).toBe(category);
          });
        });
      },
    );
  });

  describe('상품 정렬 기능 테스트', () => {
    it.each(Object.keys(sortOptions))(
      '"%s" 정렬로 요청하면 받은 데이터는 해당 기준으로 정렬된 데이터이다.',
      async (sortKey) => {
        const selectBarCondition = {
          category: 'all',
          sort: sortKey,
        };

        const { result } = renderHook(() => useProducts({ selectBarCondition }), {
          wrapper,
        });

        await waitFor(() => {
          const products = result.current.products;
          expect(products).toHaveLength(FIRST_FETCH_SIZE);

          const isSorted = products?.every((product, index) => {
            if (index === 0) return true;
            if (sortKey === 'priceAsc') {
              return products[index - 1].price <= product.price;
            } else {
              return products[index - 1].price >= product.price;
            }
          });

          expect(isSorted).toBe(true);
        });
      },
    );
  });
});
