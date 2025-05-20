import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ShoppingList from './ShoppingList';
import { CartItem } from '../../types/common';
import { Product } from '../../types/common';
import { cartApi } from '../../api/cart';
import { apiRequest } from '../../api/apiRequest';

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

const mockOpenToast = vi.fn();

vi.mock('../../api', () => ({
  apiRequest: vi.fn(),
}));

vi.mock('../../api/cart', () => ({
  cartApi: {
    getCartItems: vi.fn(),
    addToCart: vi.fn(),
    removeFromCart: vi.fn(),
  },
}));

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
    vi.resetAllMocks();

    vi.mocked(apiRequest).mockImplementation((endpoint) => {
      if (endpoint.includes('/products')) {
        return Promise.resolve(mockProducts);
      } else if (endpoint.includes('/cart-items')) {
        return Promise.resolve(mockCartItems);
      }
      return Promise.resolve({});
    });

    vi.mocked(cartApi.getCartItems).mockResolvedValue(mockCartItems.content);
    vi.mocked(cartApi.addToCart).mockImplementation(async (productId) => {
      const product = mockProducts.content.find((p) => p.id === productId);
      if (product) {
        const newItem = {
          id: Date.now(),
          product: product,
          quantity: 1,
        };
        mockCartItems.content.push(newItem);
        return newItem;
      }
      throw new Error('상품을 찾을 수 없습니다');
    });

    vi.mocked(cartApi.removeFromCart).mockImplementation(async (cartItemId) => {
      mockCartItems.content = mockCartItems.content.filter(
        (item) => item.id !== cartItemId
      );
      return Promise.resolve();
    });

    mockOpenToast.mockClear();
  });

  afterEach(() => {
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
      expect(cartApi.addToCart).toHaveBeenCalledWith(1);
    });

    expect(cartApi.getCartItems).toHaveBeenCalled();
  });

  it('장바구니에서 상품을 제거한다', async () => {
    mockCartItems.content = [
      {
        id: 1,
        product: mockProducts.content[0],
        quantity: 1,
      },
    ];

    vi.mocked(cartApi.getCartItems).mockResolvedValue(mockCartItems.content);

    render(<ShoppingList />);

    await waitFor(() => {
      const removeButton = screen.queryByText('빼기');
      expect(removeButton).toBeTruthy();
    });

    vi.clearAllMocks();

    const removeButton = screen.getByText('빼기');
    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(cartApi.removeFromCart).toHaveBeenCalledWith(1);
    });

    expect(cartApi.getCartItems).toHaveBeenCalled();
  });

  it('장바구니 추가 실패 시 에러 처리가 된다', async () => {
    vi.mocked(cartApi.addToCart).mockRejectedValueOnce(new Error('API 오류'));

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
