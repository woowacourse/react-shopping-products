import { act, renderHook, waitFor } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { ENDPOINTS_PRODUCTS } from '../api/endpoints';
import { server } from '../mocks/node';
import useFetchProducts from './useFetchProducts';

import MOCK_PRODUCTS from '../mocks/products.json';
import { SortingParam } from '../types/sort';

describe('fetchProducts', () => {
  it('상품 목록 첫 조회시에는 20개의 아이템을 가져온다.', async () => {
    const { result } = renderHook(() => useFetchProducts());

    await waitFor(() => {
      expect(result.current.products).toHaveLength(20);
    });
  });

  it('상품 목록 조회 시 에러', async () => {
    renderHook(() => {
      server.use(
        http.get(ENDPOINTS_PRODUCTS, () => {
          return new HttpResponse(null, { status: 500 });
        }),
      );
    });

    const { result } = renderHook(useFetchProducts);

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
  });

  it('첫 상품목록 조회 이후부터는, 이전 결과에 이어 4개씩 아이템을 추가하여 가져온다.', async () => {
    const { result } = renderHook(() => useFetchProducts());

    await waitFor(() => {
      expect(result.current.products).toHaveLength(20);
    });

    act(() => result.current.fetchNextPage());

    await waitFor(() => {
      expect(result.current.products).toHaveLength(24);
    });
  });

  it('마지막 페이지 도달 시 더 이상 요청하지 않는다.', async () => {
    const { result } = renderHook(() => useFetchProducts());

    await waitFor(() => {
      expect(result.current.products).toHaveLength(20);
    });

    act(() => result.current.fetchNextPage());
    for (let i = 2; i <= 21; i++) {
      act(() => result.current.fetchNextPage());
    }

    await waitFor(() => {
      expect(result.current.page).toBe(21);
    });

    act(() => result.current.fetchNextPage());

    await waitFor(() => {
      expect(result.current.page).toBe(21);
    });
  });

  // [id, asc] 정렬

  it('정렬 기준이 id, 내림차순일 때 정렬된 결과가 나와야 한다.', async () => {
    const sorting: SortingParam[] = [{ name: 'id', order: 'desc' }];
    const { result } = renderHook(() => useFetchProducts(sorting));

    const mockProducts = MOCK_PRODUCTS.content;
    mockProducts.sort((a, b) => b.id - a.id);
    const SORTED_MOCK_PRODUCTS = mockProducts.slice(0, 20);
    await waitFor(() => {
      expect(result.current.products).toHaveLength(20);
      expect(result.current.products).toEqual(SORTED_MOCK_PRODUCTS);
    });
  });

  it('정렬 기준이 id, 오름차순일 때 정렬된 결과가 나와야 한다.', async () => {
    const sorting: SortingParam[] = [{ name: 'id', order: 'asc' }];
    const { result } = renderHook(() => useFetchProducts(sorting));

    const mockProducts = MOCK_PRODUCTS.content;
    mockProducts.sort((a, b) => a.id - b.id);
    const SORTED_MOCK_PRODUCTS = mockProducts.slice(0, 20);
    await waitFor(() => {
      expect(result.current.products).toHaveLength(20);
      expect(result.current.products).toEqual(SORTED_MOCK_PRODUCTS);
    });
  });

  it('정렬 기준이 id, 내림차순일 때 정렬된 결과가 나와야 한다.', async () => {
    const sorting: SortingParam[] = [{ name: 'id', order: 'desc' }];
    const { result } = renderHook(() => useFetchProducts(sorting));

    const mockProducts = MOCK_PRODUCTS.content;
    mockProducts.sort((a, b) => b.id - a.id);
    const SORTED_MOCK_PRODUCTS = mockProducts.slice(0, 20);
    await waitFor(() => {
      expect(result.current.products).toHaveLength(20);
      expect(result.current.products).toEqual(SORTED_MOCK_PRODUCTS);
    });
  });

  it('정렬 기준이 name, 오름차순일 때 정렬된 결과가 나와야 한다.', async () => {
    const sorting: SortingParam[] = [{ name: 'name', order: 'asc' }];
    const { result } = renderHook(() => useFetchProducts(sorting));

    const mockProducts = MOCK_PRODUCTS.content;
    mockProducts.sort((a, b) => a.name.localeCompare(b.name));
    const SORTED_MOCK_PRODUCTS = mockProducts.slice(0, 20);
    await waitFor(() => {
      expect(result.current.products).toHaveLength(20);
      expect(result.current.products).toEqual(SORTED_MOCK_PRODUCTS);
    });
  });

  it('정렬 기준이 (name, 오름차순),(id, 내림차순)일 때 정렬된 결과가 나와야 한다.', async () => {
    const sorting: SortingParam[] = [
      { name: 'name', order: 'asc' },
      { name: 'id', order: 'desc' },
    ];
    const { result } = renderHook(() => useFetchProducts(sorting));

    const mockProducts = MOCK_PRODUCTS.content;
    mockProducts.sort((a, b) => a.name.localeCompare(b.name));
    mockProducts.sort((a, b) => b.id - a.id);
    const SORTED_MOCK_PRODUCTS = mockProducts.slice(0, 20);
    await waitFor(() => {
      expect(result.current.products).toHaveLength(20);
      expect(result.current.products).toEqual(SORTED_MOCK_PRODUCTS);
    });
  });
});
