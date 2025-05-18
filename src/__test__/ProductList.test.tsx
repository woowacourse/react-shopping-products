import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ProductListPage } from '@/features/ProductList';

vi.mock('@/shared/components/Toast', () => ({
  Toast: {
    show: vi.fn(),
  },
}));

vi.mock('@/api/product', () => ({
  getProductList: vi.fn(),
}));

vi.mock('@/features/ProductList/hooks/useShopping', () => ({
  useShopping: () => ({
    cartData: [],
    filteredData: [
      { id: 1, name: '상품 1', price: 10000, imageUrl: '', isChecked: false },
      { id: 2, name: '상품 2', price: 20000, imageUrl: '', isChecked: false },
    ],
    isLoading: false,
    toggleCartItem: vi.fn(),
    categorySelect: '전체',
    priceSelect: '전체',
    handleCategorySelect: vi.fn(),
    handlePriceSelect: vi.fn(),
  }),
}));

describe('ProductList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('상품 목록을 올바르게 렌더링한다', async () => {
    render(<ProductListPage />);

    await waitFor(() => {
      expect(screen.getByText('상품 1')).toBeDefined();
      expect(screen.getByText('상품 2')).toBeDefined();
    });
  });
});
