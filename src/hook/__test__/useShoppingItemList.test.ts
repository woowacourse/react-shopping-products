import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import useShoppingItemList from '../useShoppingItemList';

import { apiRequest } from '../../api/apiRequest';

const mockProducts = {
  content: [
    {
      id: 1,
      name: '상품 1',
      price: 10000,
      imageUrl: 'image1.jpg',
      category: '패션잡화',
      quantity: 1,
    },
    {
      id: 2,
      name: '상품 2',
      price: 11000,
      imageUrl: 'image2.jpg',
      category: '식료품',
      quantity: 1,
    },
    {
      id: 3,
      name: '상품 3',
      price: 15000,
      imageUrl: 'image3.jpg',
      category: '패션잡화',
      quantity: 1,
    },
    {
      id: 4,
      name: '상품 4',
      price: 30000,
      imageUrl: 'image4.jpg',
      category: '식료품',
      quantity: 1,
    },
  ],
};

vi.mock('../../api/apiRequest', () => ({
  apiRequest: vi.fn(),
}));

const mockApiRequest = vi.mocked(apiRequest);

describe('useShoppingItemList', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockApiRequest.mockImplementation((url: string) => {
      const urlObj = new URL(url, 'http://localhost');
      const category = urlObj.searchParams.get('category');
      const sort = urlObj.searchParams.get('sort');

      let filteredProducts = [...mockProducts.content];

      // 카테고리 필터링
      if (category) {
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

      return Promise.resolve({ content: filteredProducts });
    });
  });

  it('초기 상태는 빈 배열과 null 에러, false 로딩 상태이다.', async () => {
    const { result } = renderHook(() => useShoppingItemList());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.data).toEqual(mockProducts.content);
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('상품 목록을 성공적으로 가져온다.', async () => {
    const { result } = renderHook(() => useShoppingItemList());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.data).toEqual(mockProducts.content);
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('상품 목록 가져오기에 실패하면 에러가 설정된다.', async () => {
    const error = new Error('API 오류');
    mockApiRequest.mockRejectedValueOnce(error);

    const { result } = renderHook(() => useShoppingItemList());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe(
      '상품 목록을 불러오는데 실패했습니다. 다시 시도해주세요.'
    );
    expect(result.current.isLoading).toBe(false);
  });

  it('카테고리가 변경되면 해당 카테고리의 상품만 가져온다.', async () => {
    const { result } = renderHook(() => useShoppingItemList());

    await act(async () => {
      result.current.selectCategory('식료품');
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const expectedData = mockProducts.content.filter(
      (product) => product.category === '식료품'
    );

    expect(result.current.data).toEqual(expectedData);
  });

  it('정렬 방식이 변경되면 가격순으로 정렬된 상품을 가져온다.', async () => {
    const { result } = renderHook(() => useShoppingItemList());

    await act(async () => {
      result.current.selectSort('높은 가격순');
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const expectedData = [...mockProducts.content].sort(
      (a, b) => b.price - a.price
    );

    expect(result.current.data).toEqual(expectedData);
  });

  it('카테고리와 정렬을 동시에 적용할 수 있다.', async () => {
    const { result } = renderHook(() => useShoppingItemList());

    await act(async () => {
      result.current.selectCategory('패션잡화');
      result.current.selectSort('높은 가격순');
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const expectedData = mockProducts.content
      .filter((product) => product.category === '패션잡화')
      .sort((a, b) => b.price - a.price);

    expect(result.current.data).toEqual(expectedData);
  });
});
