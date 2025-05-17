import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { vi } from 'vitest';

import { getCartItemList, addCartItem } from '@/api/cart';
import { getProductList } from '@/api/product';
import { ProductListPage } from '@/features/ProductList';
import { CartItem } from '@/features/ProductList/types/Cart';

vi.mock('@/api/product', () => ({ getProductList: vi.fn() }));
vi.mock('@/api/cart', () => ({
  getCartItemList: vi.fn(),
  addCartItem: vi.fn(),
  deleteCartItem: vi.fn(),
}));

vi.mock('@/shared/hooks/useApiRequest', () => ({
  useApiRequest: () => ({
    isLoading: false,
    handleRequest: async <T, R = T>(
      apiCall: () => Promise<T>,
      setCallback: (data: T) => R
    ): Promise<T | R | undefined> => {
      return apiCall().then(setCallback);
    },
  }),
}));

describe('ProductListPage 담기 동작', () => {
  const sampleProducts = [
    { id: 1, name: '상품 1', price: 1000, imageUrl: 'img1.png', category: '식료품' },
  ];
  const initialCart: CartItem[] = [];
  const afterAddCart = [{ id: 10, product: sampleProducts[0] }];

  beforeEach(() => {
    (getProductList as jest.Mock).mockResolvedValue(sampleProducts);
    (getCartItemList as jest.Mock).mockResolvedValue(initialCart);
    (addCartItem as jest.Mock).mockResolvedValue(afterAddCart);
  });

  it('상품의 “담기”버튼 클릭 시 헤더 내부에 존재하는 장바구니 count가 1 증가한다', async () => {
    render(<ProductListPage />);

    await waitFor(() => screen.getByText('상품 1'));

    const bagButton = screen.getByRole('button', { name: /Shopping Bag/i });

    expect(within(bagButton).queryByText('1'));

    fireEvent.click(screen.getByRole('button', { name: /담기/i }));

    await waitFor(() => {
      expect(within(bagButton).getByText('1')).toBeDefined();
    });
  });
});
