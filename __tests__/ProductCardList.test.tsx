import { renderHook, act } from '@testing-library/react';
import { vi, describe, test, expect, beforeEach } from 'vitest';
import { useProductsFetch } from '../src/hooks/useProductsFetch';
import fetchProducts from '../src/APIs/fetchProducts';
import { Category } from '../src/types/product.type';

vi.mock('../src/APIs/fetchProducts');

const mockedFetchProducts = fetchProducts as jest.MockedFunction<
  typeof fetchProducts
>;

describe('상품 목록 테스트', () => {
  const mockProducts = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    name: `테스트 상품 ${index + 1}`,
    price: 1000 + index * 100,
    imageUrl: `/images/test${index + 1}.png`,
    category: (index % 2 === 0 ? '식료품' : '패션잡화') as Category,
  }));

  beforeEach(() => {
    mockedFetchProducts.mockReset();
  });

  test('기본 sort, category로 API 요청 후 정상적으로 데이터를 받아온다.', async () => {
    mockedFetchProducts.mockResolvedValueOnce({
      content: mockProducts,
      totalPages: 1,
    });

    const { result } = renderHook(() => useProductsFetch('price,asc', '전체'));

    expect(result.current.isLoading).toBe(true);

    await act(async () => {});

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error.is).toBe(false);
    expect(result.current.items).toHaveLength(mockProducts.length);
  });

  test('API 요청 실패 시 error가 발생한다.', async () => {
    mockedFetchProducts.mockRejectedValueOnce(new Error('fetch error'));

    const { result } = renderHook(() => useProductsFetch('price,asc', '전체'));

    await act(async () => {});

    expect(result.current.error.is).toBe(true);
    expect(result.current.items).toHaveLength(0);
  });

  describe('식료품 카테고리 테스트', () => {
    test('식료품 카테고리로 요청 시 식료품 상품만 받아온다.', async () => {
      mockedFetchProducts.mockResolvedValueOnce({
        content: mockProducts.filter((p) => p.category === '식료품'),
        totalPages: 1,
      });

      const { result } = renderHook(() =>
        useProductsFetch('price,desc', '식료품')
      );

      expect(mockedFetchProducts).toHaveBeenCalledWith({
        endpoint: expect.stringContaining(`category=식료품`),
      });
      expect(result.current.items.every((p) => p.category === '식료품')).toBe(
        true
      );
    });

    test('가격 내림차순으로 정렬된 식료품 상품을 받아온다.', async () => {
      mockedFetchProducts.mockResolvedValueOnce({
        content: mockProducts.filter((p) => p.category === '식료품'),
        totalPages: 1,
      });

      const { result } = renderHook(() =>
        useProductsFetch('price,desc', '식료품')
      );

      await act(async () => {});

      expect(
        result.current.items.map((p) => p.price).sort((a, b) => b - a)
      ).toEqual([2800, 2600, 2400, 2200, 2000, 1800, 1600, 1400, 1200, 1000]);
    });

    test('가격 오름차순으로 정렬된 식료품 상품을 받아온다.', async () => {
      mockedFetchProducts.mockResolvedValueOnce({
        content: mockProducts.filter((p) => p.category === '식료품'),
        totalPages: 1,
      });

      const { result } = renderHook(() =>
        useProductsFetch('price,asc', '식료품')
      );

      await act(async () => {});

      expect(
        result.current.items.map((p) => p.price).sort((a, b) => a - b)
      ).toEqual([1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800]);
    });
  });

  describe('패션잡화 카테고리 테스트', () => {
    test('패션잡화 카테고리로 요청 시 패션잡화 상품만 받아온다.', async () => {
      mockedFetchProducts.mockResolvedValueOnce({
        content: mockProducts.filter((p) => p.category === '패션잡화'),
        totalPages: 1,
      });

      const { result } = renderHook(() =>
        useProductsFetch('price,desc', '패션잡화')
      );

      expect(mockedFetchProducts).toHaveBeenCalledWith({
        endpoint: expect.stringContaining(`category=패션잡화`),
      });
      expect(result.current.items.every((p) => p.category === '패션잡화')).toBe(
        true
      );
    });

    test('가격 내림차순으로 정렬된 패션잡화 상품을 받아온다.', async () => {
      mockedFetchProducts.mockResolvedValueOnce({
        content: mockProducts.filter((p) => p.category === '패션잡화'),
        totalPages: 1,
      });

      const { result } = renderHook(() =>
        useProductsFetch('price,desc', '패션잡화')
      );

      await act(async () => {});

      expect(
        result.current.items.map((p) => p.price).sort((a, b) => b - a)
      ).toEqual([2900, 2700, 2500, 2300, 2100, 1900, 1700, 1500, 1300, 1100]);
    });

    test('가격 오름차순으로 정렬된 패션잡화 상품을 받아온다.', async () => {
      mockedFetchProducts.mockResolvedValueOnce({
        content: mockProducts.filter((p) => p.category === '패션잡화'),
        totalPages: 1,
      });

      const { result } = renderHook(() =>
        useProductsFetch('price,asc', '패션잡화')
      );

      await act(async () => {});

      expect(
        result.current.items.map((p) => p.price).sort((a, b) => a - b)
      ).toEqual([1100, 1300, 1500, 1700, 1900, 2100, 2300, 2500, 2700, 2900]);
    });
  });
});
