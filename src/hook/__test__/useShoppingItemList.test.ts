import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../../test/setup';
import useShoppingItemList from '../useShoppingItemList';
import { Product } from '../../types/common';

// 상수 정의
const API_BASE_URL =
  'http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com';
const PRODUCTS_ENDPOINT = `${API_BASE_URL}/products`;

// 테스트 데이터 팩토리
const createMockProduct = (overrides: Partial<Product> = {}): Product => ({
  id: 1,
  name: '상품 1',
  price: 10000,
  imageUrl: 'image1.jpg',
  category: '패션잡화',
  quantity: 1,
  ...overrides,
});

const mockProducts: Product[] = [
  createMockProduct({
    id: 1,
    name: '상품 1',
    price: 10000,
    category: '패션잡화',
  }),
  createMockProduct({
    id: 2,
    name: '상품 2',
    price: 11000,
    category: '식료품',
  }),
  createMockProduct({
    id: 3,
    name: '상품 3',
    price: 15000,
    category: '패션잡화',
  }),
  createMockProduct({
    id: 4,
    name: '상품 4',
    price: 30000,
    category: '식료품',
  }),
];

// 응답 데이터 생성 헬퍼
const createProductResponse = (content: Product[]) => ({
  content,
  totalElements: content.length,
  totalPages: content.length > 0 ? 1 : 0,
  size: content.length,
  number: 0,
});

// MSW 핸들러 헬퍼 함수들
const mockGetProducts = (products: Product[] = mockProducts) => {
  return http.get(PRODUCTS_ENDPOINT, ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const sort = url.searchParams.get('sort');

    let filteredProducts = [...products];

    // 카테고리 필터링
    if (category && category !== '전체') {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === category
      );
    }

    // 정렬
    if (sort === 'price,desc') {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sort === 'price,asc') {
      filteredProducts.sort((a, b) => a.price - b.price);
    }

    return HttpResponse.json(createProductResponse(filteredProducts));
  });
};

const mockGetProductsError = () => {
  return http.get(PRODUCTS_ENDPOINT, () => {
    return HttpResponse.error();
  });
};

describe('useShoppingItemList', () => {
  beforeEach(() => {
    server.resetHandlers();
  });

  it('초기 상태에서 상품 목록을 성공적으로 가져온다', async () => {
    server.use(mockGetProducts());

    const { result } = renderHook(() => useShoppingItemList());

    await act(async () => null);

    expect(result.current.data).toEqual(mockProducts);
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('상품 목록 가져오기에 실패하면 에러가 설정된다', async () => {
    server.use(mockGetProductsError());

    const { result } = renderHook(() => useShoppingItemList());

    await act(async () => null);

    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe(
      '상품 목록을 불러오는데 실패했습니다. 다시 시도해주세요.'
    );
    expect(result.current.isLoading).toBe(false);
  });

  it('카테고리가 변경되면 해당 카테고리의 상품만 가져온다', async () => {
    server.use(mockGetProducts());

    const { result } = renderHook(() => useShoppingItemList());

    await act(async () => {
      result.current.selectCategory('식료품');
    });

    const expectedData = mockProducts.filter(
      (product) => product.category === '식료품'
    );

    expect(result.current.data).toEqual(expectedData);
    expect(result.current.category).toBe('식료품');
  });

  it('정렬 방식이 변경되면 가격순으로 정렬된 상품을 가져온다', async () => {
    server.use(mockGetProducts());

    const { result } = renderHook(() => useShoppingItemList());

    await act(async () => {
      result.current.selectSort('높은 가격순');
    });

    const expectedData = [...mockProducts].sort((a, b) => b.price - a.price);

    expect(result.current.data).toEqual(expectedData);
    expect(result.current.sortType).toBe('높은 가격순');
  });

  it('카테고리와 정렬을 동시에 적용할 수 있다', async () => {
    server.use(mockGetProducts());

    const { result } = renderHook(() => useShoppingItemList());

    await act(async () => {
      result.current.selectCategory('패션잡화');
      result.current.selectSort('높은 가격순');
    });

    const expectedData = mockProducts
      .filter((product) => product.category === '패션잡화')
      .sort((a, b) => b.price - a.price);

    expect(result.current.data).toEqual(expectedData);
    expect(result.current.category).toBe('패션잡화');
    expect(result.current.sortType).toBe('높은 가격순');
  });

  it('낮은 가격순 정렬이 올바르게 작동한다', async () => {
    server.use(mockGetProducts());

    const { result } = renderHook(() => useShoppingItemList());

    await act(async () => {
      result.current.selectSort('낮은 가격순');
    });

    const expectedData = [...mockProducts].sort((a, b) => a.price - b.price);

    expect(result.current.data).toEqual(expectedData);
    expect(result.current.sortType).toBe('낮은 가격순');
  });

  it('전체 카테고리 선택 시 모든 상품을 가져온다', async () => {
    server.use(mockGetProducts());

    const { result } = renderHook(() => useShoppingItemList());

    // 먼저 특정 카테고리 선택
    await act(async () => {
      result.current.selectCategory('식료품');
    });

    // 전체 카테고리로 변경
    await act(async () => {
      result.current.selectCategory('전체');
    });

    expect(result.current.data).toEqual(mockProducts);
    expect(result.current.category).toBe('전체');
  });
});
