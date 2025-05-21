/// <reference types="vitest" />
import { renderHook, act, waitFor } from '@testing-library/react';
import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  SpyInstance,
} from 'vitest';
import { useProducts } from '../hooks/useProducts';
import * as productApi from '../api/fetchProduct';
import * as cartApi from '../api/fetchCart';
import type { ProductElement, CartItem, CartResponse } from '../types/product';

const mockProducts = {
  content: [
    { id: 1, name: '상품1', price: 100, category: '식료품', imageUrl: 'url1' },
    {
      id: 2,
      name: '상품2',
      price: 200,
      category: '패션잡화',
      imageUrl: 'url2',
    },
  ],
} as { content: ProductElement[] };

const mockCart = {
  content: [{ id: 10, product: { id: 1 } } as CartItem],
} as CartResponse;

describe('useProducts 훅', () => {
  let getProductSpy: SpyInstance;
  let getCartItemSpy: SpyInstance;

  beforeEach(() => {
    getProductSpy = vi.spyOn(productApi, 'getProduct');
    getCartItemSpy = vi.spyOn(cartApi, 'getCartItem');
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('상품과 장바구니 데이터를 정상적으로 가져와서 상태를 업데이트한다', async () => {
    getProductSpy.mockResolvedValue(mockProducts);
    getCartItemSpy.mockResolvedValue(mockCart);

    const { result } = renderHook(() => useProducts('asc', '전체'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isError).toBe(false);
    expect(result.current.cart).toEqual(mockCart);
    expect(result.current.products).toEqual([
      {
        id: 1,
        name: '상품1',
        price: 100,
        category: '식료품',
        imageUrl: 'url1',
        isInCart: true,
        cartId: 10,
      },
      {
        id: 2,
        name: '상품2',
        price: 200,
        category: '패션잡화',
        imageUrl: 'url2',
        isInCart: false,
        cartId: undefined,
      },
    ]);
  });

  it('특정 카테고리로 필터링하여 데이터를 가져온다', async () => {
    getProductSpy.mockResolvedValue(mockProducts);
    getCartItemSpy.mockResolvedValue(mockCart);

    const { result } = renderHook(() => useProducts('asc', '식료품'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.products).toEqual([
      {
        id: 1,
        name: '상품1',
        price: 100,
        category: '식료품',
        imageUrl: 'url1',
        isInCart: true,
        cartId: 10,
      },
    ]);
  });

  it('API 호출 중 에러가 발생하면 isError가 true가 된다', async () => {
    getProductSpy.mockRejectedValue(new Error('상품 조회 실패'));
    getCartItemSpy.mockResolvedValue(mockCart);

    const { result } = renderHook(() => useProducts('asc', '전체'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isError).toBe(true);
    expect(result.current.products).toEqual([]);
    expect(result.current.cart).toBeNull();
  });

  it('fetchData를 수동으로 호출할 수 있다', async () => {
    getProductSpy.mockResolvedValue(mockProducts);
    getCartItemSpy.mockResolvedValue(mockCart);

    const { result } = renderHook(() => useProducts('asc', '전체'));

    await act(async () => {
      await result.current.fetchData();
    });

    expect(getProductSpy).toHaveBeenCalledTimes(2);
    expect(result.current.products.length).toBe(2);
  });
});
