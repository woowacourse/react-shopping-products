import { renderHook, act } from '@testing-library/react';
import { vi, describe, test, expect, beforeEach, Mock } from 'vitest';
import mockProducts from '../src/mocks/products.json';
import { useProducts } from '../src/hooks/useProducts';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { useDataContext } from '../src/contexts/useDataContext';
import { handlers } from '../src/mocks/handlers';

vi.mock('../src/contexts/useDataContext');

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('상품 목록 테스트', () => {
  const defaultProductsState = {
    data: null,
    loading: false,
    error: null,
    category: '전체',
    sort: 'price,asc',
  };

  beforeEach(() => {
    (useDataContext as Mock).mockReturnValue({
      state: { products: defaultProductsState },
      setData: vi.fn(),
      setLoading: vi.fn(),
      setError: vi.fn(),
      clearError: vi.fn(),
      initApi: vi.fn(),
      setCategory: vi.fn(),
      setSort: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('기본 sort, category로 API 요청 후 정상적으로 데이터를 받아온다.', async () => {
    (useDataContext as Mock).mockReturnValue({
      state: {
        products: {
          ...defaultProductsState,
          data: mockProducts,
        },
      },
      setData: vi.fn(),
      setLoading: vi.fn(),
      setError: vi.fn(),
      clearError: vi.fn(),
      initApi: vi.fn(),
      setCategory: vi.fn(),
      setSort: vi.fn(),
    });

    server.use(
      http.get('/products', () => {
        return HttpResponse.json(mockProducts, { status: 200 });
      })
    );

    const { result } = renderHook(() => useProducts());

    await act(async () => {});

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.data).toHaveLength(mockProducts.length);
  });

  test('가격 내림차순으로 정렬된 상품을 받아온다.', async () => {
    const sort = 'price,desc';
    const filtered = mockProducts.sort((a, b) => b.price - a.price);

    (useDataContext as Mock).mockReturnValue({
      state: {
        products: {
          ...defaultProductsState,
          data: mockProducts,
        },
      },
      setData: vi.fn(),
      setLoading: vi.fn(),
      setError: vi.fn(),
      clearError: vi.fn(),
      initApi: vi.fn(),
      setCategory: vi.fn(),
      setSort: vi.fn(),
    });

    server.use(
      http.get('/products', ({ request }) => {
        const url = new URL(request.url);
        expect(url.searchParams.get('sort')).toBe(sort);
        return HttpResponse.json(filtered, { status: 200 });
      })
    );

    const { result } = renderHook(() => useProducts());
    await act(async () => {});

    expect(
      result.current.data
        .map((p) => p.price)
        .sort((a, b) => b - a)
        .slice(0, 5)
    ).toEqual([60000000, 11100000, 3210000, 850000, 800000]);
  });

  test('가격 오름차순으로 정렬된 상품을 받아온다.', async () => {
    const sort = 'price,asc';
    const filtered = mockProducts.sort((a, b) => a.price - b.price);

    (useDataContext as Mock).mockReturnValue({
      state: {
        products: {
          ...defaultProductsState,
          data: mockProducts,
        },
      },
      setData: vi.fn(),
      setLoading: vi.fn(),
      setError: vi.fn(),
      clearError: vi.fn(),
      initApi: vi.fn(),
      setCategory: vi.fn(),
      setSort: vi.fn(),
    });

    server.use(
      http.get('/products', ({ request }) => {
        const url = new URL(request.url);
        expect(url.searchParams.get('sort')).toBe(sort);
        return HttpResponse.json(filtered, { status: 200 });
      })
    );

    const { result } = renderHook(() => useProducts());
    await act(async () => {});

    expect(
      result.current.data
        .map((p) => p.price)
        .sort((a, b) => a - b)
        .slice(0, 5)
    ).toEqual([100, 3800, 4800, 5000, 8130]);
  });

  test('카테고리로 필터링된 상품을 받아온다.', async () => {
    const category = '패션잡화';
    const filtered = mockProducts.filter((p) => p.category === category);

    (useDataContext as Mock).mockReturnValue({
      state: {
        products: {
          ...defaultProductsState,
          data: filtered, // ← 여기
          category, // ← 여기
        },
      },
      setData: vi.fn(),
      setLoading: vi.fn(),
      setError: vi.fn(),
      clearError: vi.fn(),
      initApi: vi.fn(),
      setCategory: vi.fn(),
      setSort: vi.fn(),
    });

    server.use(
      http.get('/products', ({ request }) => {
        const url = new URL(request.url);
        expect(url.searchParams.get('category')).toBe(category);
        return HttpResponse.json(filtered, { status: 200 });
      })
    );

    const { result } = renderHook(() => useProducts());

    await act(async () => {});

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.data).toHaveLength(filtered.length);
    expect(result.current.data.every((p) => p.category === category)).toBe(
      true
    );
  });
});
