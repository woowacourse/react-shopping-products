import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useProducts } from '../hooks/useProducts';
import * as productApi from '../api/fetchProduct';
import * as cartApi from '../api/fetchCart';
import type { CategoryType, CartResponse } from '../types/product';

function TestComponent({
  mappedSortType,
  category,
}: {
  mappedSortType: string;
  category: CategoryType;
}) {
  const { products, cart, isLoading, isError } = useProducts(
    mappedSortType,
    category
  );

  return (
    <>
      <span data-testid="isLoading">{isLoading ? 'true' : 'false'}</span>
      <span data-testid="isError">{isError ? 'true' : 'false'}</span>
      <span data-testid="data">{JSON.stringify(products)}</span>
      <span data-testid="cart">{JSON.stringify(cart)}</span>
    </>
  );
}

describe('useProducts hook', () => {
  const mockProducts = {
    content: [
      { id: 1, name: 'p1', category: '식료품', price: 100, imageUrl: 'url1' },
      { id: 2, name: 'p2', category: '패션잡화', price: 200, imageUrl: 'url2' },
    ],
  };
  const mockCart: CartResponse = {
    content: [
      {
        id: 10,
        quantity: 1,
        product: {
          id: 1,
          name: 'p1',
          category: '식료품',
          price: 100,
          imageUrl: 'url1',
        },
      },
    ],
    totalElements: 1,
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('상품과 장바구니 데이터를 불러온 뒤, 올바르게 매핑한다.', async () => {
    vi.spyOn(productApi, 'getProduct').mockResolvedValue(mockProducts as any);
    vi.spyOn(cartApi, 'getCartItem').mockResolvedValue(mockCart);

    render(<TestComponent mappedSortType="asc" category="전체" />);

    expect(screen.getByTestId('isLoading').textContent).toBe('true');

    await waitFor(() =>
      expect(screen.getByTestId('isLoading').textContent).toBe('false')
    );

    expect(screen.getByTestId('isError').textContent).toBe('false');

    const data = JSON.parse(screen.getByTestId('data').textContent || 'null');
    expect(data).toEqual([
      {
        id: 1,
        name: 'p1',
        price: 100,
        category: '식료품',
        imageUrl: 'url1',
        isInCart: true,
        cartId: 10,
      },
      {
        id: 2,
        name: 'p2',
        price: 200,
        category: '패션잡화',
        imageUrl: 'url2',
        isInCart: false,
        cartId: undefined,
      },
    ]);

    const cart = JSON.parse(screen.getByTestId('cart').textContent || 'null');
    expect(cart).toEqual(mockCart);
  });

  it('상품 조회 실패 시 에러 상태를 설정한다.', async () => {
    vi.spyOn(productApi, 'getProduct').mockRejectedValue(new Error('fail'));
    vi.spyOn(cartApi, 'getCartItem').mockResolvedValue(mockCart);

    render(<TestComponent mappedSortType="asc" category="전체" />);

    await waitFor(() =>
      expect(screen.getByTestId('isLoading').textContent).toBe('false')
    );
    expect(screen.getByTestId('isError').textContent).toBe('true');
  });

  it('카테고리별로 상품을 필터링한다.', async () => {
    vi.spyOn(productApi, 'getProduct').mockResolvedValue(mockProducts as any);
    vi.spyOn(cartApi, 'getCartItem').mockResolvedValue(mockCart);

    render(<TestComponent mappedSortType="asc" category="식료품" />);

    await waitFor(() =>
      expect(screen.getByTestId('isLoading').textContent).toBe('false')
    );

    const data = JSON.parse(screen.getByTestId('data').textContent || 'null');
    expect(data).toEqual([
      {
        id: 1,
        name: 'p1',
        price: 100,
        category: '식료품',
        imageUrl: 'url1',
        isInCart: true,
        cartId: 10,
      },
    ]);
  });
});
