import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ShoppingList from './index';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  http.get('/products', () => {
    return HttpResponse.json({
      content: [
        {
          id: 1,
          name: '상품 1',
          price: 10000,
          imageUrl: 'image1.jpg',
          category: '패션잡화',
          quantity: 10,
        },
      ],
      pageable: {
        pageNumber: 0,
        pageSize: 20,
        sort: {
          empty: true,
          sorted: false,
          unsorted: true,
        },
        offset: 0,
        paged: true,
        unpaged: false,
      },
      last: true,
      totalElements: 1,
      totalPages: 1,
      size: 1,
      number: 0,
      sort: {
        empty: true,
        sorted: false,
        unsorted: true,
      },
      first: true,
      numberOfElements: 1,
      empty: false,
    });
  }),

  http.get('/cart-items', () => {
    return HttpResponse.json({
      content: [],
    });
  }),

  http.post('/cart-items', async ({ request }) => {
    const body = (await request.json()) as {
      productId: number;
      quantity: number;
    };
    return HttpResponse.json({
      id: 1,
      product: {
        id: body.productId,
        name: '상품 1',
        price: 10000,
        imageUrl: 'image1.jpg',
        category: '패션잡화',
        quantity: 10,
      },
      quantity: body.quantity,
    });
  }),

  http.delete('/cart-items/:id', () => {
    return new HttpResponse(null, { status: 204 });
  })
);

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

vi.mock('../../hook/useCartManager', () => {
  const actual = vi.importActual('../../hook/useCartManager');
  return {
    ...actual,
  };
});

describe('ShoppingList 장바구니 기능', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
    vi.clearAllMocks();
    mockOpenToast.mockClear();
  });

  afterAll(() => {
    server.close();
  });

  beforeEach(() => {
    vi.stubEnv('VITE_API_BASE_URL', 'http://test-api.com');
    vi.stubEnv('VITE_API_KEY', 'test-api-key');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('장바구니에 상품을 추가한다', async () => {
    render(<ShoppingList />);

    await waitFor(() => {
      expect(screen.getByText('상품 1')).toBeTruthy();
    });

    const addButton = screen.getByText('담기');
    expect(addButton).toBeTruthy();

    fireEvent.click(addButton);

    await waitFor(() => {
      expect(mockOpenToast).toHaveBeenCalledWith(
        '상품이 장바구니에 추가되었습니다.',
        true
      );
    });
  });

  it('장바구니에서 상품을 제거한다', async () => {
    server.use(
      http.get('/cart-items', () => {
        return HttpResponse.json({
          content: [
            {
              id: 1,
              product: {
                id: 1,
                name: '상품 1',
                price: 10000,
                imageUrl: 'image1.jpg',
                category: '패션잡화',
                quantity: 10,
              },
              quantity: 1,
            },
          ],
        });
      })
    );

    render(<ShoppingList />);

    await waitFor(() => {
      expect(screen.getByText('상품 1')).toBeTruthy();
    });

    await waitFor(() => {
      const countDisplay = screen.getByText('1');
      expect(countDisplay).toBeTruthy();
    });

    const minusButton = screen.getByText('-');
    expect(minusButton).toBeTruthy();

    fireEvent.click(minusButton);

    await waitFor(() => {
      expect(mockOpenToast).toHaveBeenCalledWith(
        '상품이 장바구니에서 제거되었습니다.',
        true
      );
    });
  });

  it('장바구니 추가 실패 시 에러 처리가 된다', async () => {
    server.use(
      http.post('/cart-items', () => {
        return new HttpResponse(
          JSON.stringify({
            errorCode: 'OUT_OF_STOCK',
            message: '재고 수량을 초과하여 담을 수 없습니다.',
          }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      })
    );

    render(<ShoppingList />);

    await waitFor(() => {
      expect(screen.getByText('상품 1')).toBeTruthy();
    });

    const addButton = screen.getByText('담기');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(mockOpenToast).toHaveBeenCalledWith(
        '장바구니 담기에 실패했어요...',
        false
      );
    });
  });
});
