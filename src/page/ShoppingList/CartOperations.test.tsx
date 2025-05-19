import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ShoppingList from './index';
import { CartItem } from '../../types/common';
import { Product } from '../../types/common';

const mockProducts = {
  content: [
    {
      id: 1,
      name: '상품 1',
      price: 10000,
      imageUrl: 'image1.jpg',
      category: '패션잡화',
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
    render(<ShoppingList />);

    await waitFor(() => {
      expect(screen.getByText('상품 1')).toBeTruthy();
    });

    vi.clearAllMocks();

    const addButton = screen.getByText('담기');
    expect(addButton).toBeTruthy();

    fireEvent.click(addButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://test-api.com/cart-items',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            productId: 1,
            quantity: 1,
          }),
        })
      );
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'http://test-api.com/cart-items?page=0&size=20',
      expect.anything()
    );
  });

  it('장바구니에서 상품을 제거한다', async () => {
    mockCartItems.content = [
      {
        id: 1,
        product: mockProducts.content[0],
        quantity: 1,
      },
    ];

    render(<ShoppingList />);

    await waitFor(() => {
      expect(screen.getByText('상품 1')).toBeTruthy();
    });

    vi.clearAllMocks();

    const removeButton = screen.getByText('빼기');
    expect(removeButton).toBeTruthy();

    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://test-api.com/cart-items/1',
        expect.objectContaining({
          method: 'DELETE',
        })
      );
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'http://test-api.com/cart-items?page=0&size=20',
      expect.anything()
    );
  });

  it('장바구니 추가 실패 시 에러 처리가 된다', async () => {
    global.fetch = vi.fn().mockImplementation((url, options) => {
      if (url.includes('/products')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockProducts),
        });
      } else if (url.includes('/cart-items') && !options?.method) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ content: [] }),
        });
      } else if (url.includes('/cart-items') && options?.method === 'POST') {
        return Promise.resolve({
          ok: false,
          status: 500,
        });
      }

      return Promise.reject(new Error('Not found'));
    });

    render(<ShoppingList />);

    await waitFor(() => {
      expect(screen.getByText('상품 1')).toBeTruthy();
    });

    const addButton = screen.getByText('담기');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(mockOpenToast).toHaveBeenCalledWith(expect.any(String), false);
    });
  });
});
