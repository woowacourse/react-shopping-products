import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ShoppingList from './index';
import { CartItem } from '../../types/common';
import { Product } from '../../types/common';

vi.mock('../../hook/useShoppingItemList', () => ({
  default: () => ({
    data: [
      {
        id: 1,
        name: '상품 1',
        price: 10000,
        imageUrl: 'image1.jpg',
        category: '패션잡화',
        quantity: 10,
      },
    ],
    handleSortClick: vi.fn(),
    handleCategoryClick: vi.fn(),
    selected: '낮은 가격순',
    category: '전체',
    error: null,
    isLoading: false,
    retryFetch: vi.fn(),
  }),
}));

vi.mock('../../hook/useCartManager', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      cartData: [],
      handleAddCart: vi.fn(),
      handleRemoveCart: vi.fn(),
    })),
  };
});

const mockProducts = {
  content: [
    {
      id: 1,
      name: '상품 1',
      price: 10000,
      imageUrl: 'image1.jpg',
      category: '패션잡화',
      quantity: 10,
    },
  ] as Product[],
};

const mockCartItems = {
  content: [] as CartItem[],
};

const originalFetch = global.fetch;

const mockOpenToast = vi.fn();

vi.mock('../../component/@common/Toast/context', () => ({
  useToast: () => ({
    openToast: mockOpenToast,
    isVisible: false,
    closeToast: vi.fn(),
  }),
}));

vi.mock('react-dom', () => ({
  createPortal: (node: React.ReactNode) => node,
}));

import useCartManager from '../../hook/useCartManager';
const mockUseCartManager = useCartManager as jest.Mock;

describe('ShoppingList 장바구니 기능', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockImplementation((url, options) => {
      if (url.includes('/products') && !options?.method) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockProducts),
        });
      }

      if (url.includes('/cart-items') && !options?.method) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockCartItems),
        });
      }

      if (url.includes('/cart-items') && options?.method === 'POST') {
        const body = JSON.parse(options.body as string);
        const product = mockProducts.content.find(
          (p) => p.id === body.productId
        );

        if (product) {
          mockCartItems.content.push({
            id: Date.now(),
            product: product,
            quantity: body.quantity,
          });
        }

        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ success: true }),
        });
      }

      if (url.includes('/cart-items/') && options?.method === 'DELETE') {
        const id = Number(url.split('/').pop());
        mockCartItems.content = mockCartItems.content.filter(
          (item) => item.id !== id
        );

        return Promise.resolve({
          ok: true,
        });
      }

      return Promise.reject(new Error('Not found'));
    });

    vi.stubEnv('VITE_API_BASE_URL', 'http://test-api.com');
    vi.stubEnv('VITE_API_KEY', 'test-api-key');

    mockOpenToast.mockClear();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.unstubAllEnvs();
    vi.resetAllMocks();
    mockCartItems.content = [];
  });

  it('장바구니에 상품을 추가한다', async () => {
    const mockHandleAddCart = vi.fn();
    mockUseCartManager.mockImplementation(() => ({
      cartData: [],
      handleAddCart: mockHandleAddCart,
      handleRemoveCart: vi.fn(),
    }));

    render(<ShoppingList />);

    await waitFor(() => {
      expect(screen.getByText('상품 1')).toBeTruthy();
    });

    const addButton = screen.getByText('담기');
    expect(addButton).toBeTruthy();

    fireEvent.click(addButton);

    expect(mockHandleAddCart).toHaveBeenCalledWith(1);
  });

  it('장바구니에서 상품을 제거한다', async () => {
    const mockHandleRemoveCart = vi.fn();
    mockUseCartManager.mockImplementation(() => ({
      cartData: [
        {
          id: 1,
          product: mockProducts.content[0],
          quantity: 1,
        },
      ],
      handleAddCart: vi.fn(),
      handleRemoveCart: mockHandleRemoveCart,
    }));

    render(<ShoppingList />);

    await waitFor(() => {
      expect(screen.getByText('상품 1')).toBeTruthy();
    });

    const minusButton = screen.getByText('-');
    expect(minusButton).toBeTruthy();

    fireEvent.click(minusButton);

    expect(mockHandleRemoveCart).toHaveBeenCalledWith(1);
  });

  it('장바구니 추가 실패 시 에러 처리가 된다', async () => {
    const mockHandleAddCart = vi.fn().mockImplementation(() => {
      mockOpenToast('장바구니 추가에 실패했습니다.', false);
    });

    mockUseCartManager.mockImplementation(() => ({
      cartData: [],
      handleAddCart: mockHandleAddCart,
      handleRemoveCart: vi.fn(),
    }));

    render(<ShoppingList />);

    await waitFor(() => {
      expect(screen.getByText('상품 1')).toBeTruthy();
    });

    const addButton = screen.getByText('담기');
    fireEvent.click(addButton);

    expect(mockHandleAddCart).toHaveBeenCalledWith(1);
    expect(mockOpenToast).toHaveBeenCalledWith(expect.any(String), false);
  });
});
