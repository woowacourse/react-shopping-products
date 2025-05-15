import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import ShoppingList from './index';
import { fireEvent } from '@testing-library/react';
import { apiRequest } from '../../api';

const mockProducts = {
  content: [
    {
      id: 1,
      name: '상품 1',
      price: 10000,
      imageUrl: 'image1.jpg',
      category: '패션잡화',
    },
    {
      id: 2,
      name: '상품 2',
      price: 20000,
      imageUrl: 'image2.jpg',
      category: '패션잡화',
    },
    {
      id: 3,
      name: '상품 3',
      price: 5000,
      imageUrl: 'image3.jpg',
      category: '식료품',
    },
  ],
};

const mockCartItems = {
  content: [
    {
      id: 1,
      product: {
        id: 1,
        name: '상품 1',
        price: 10000,
        imageUrl: 'image1.jpg',
        category: '패션잡화',
      },
      quantity: 1,
    },
  ],
};

vi.mock('../../api', () => ({
  apiRequest: vi.fn(),
}));

describe('ShoppingList 컴포넌트', () => {
  beforeEach(() => {
    vi.resetAllMocks();

    vi.mocked(apiRequest).mockImplementation((endpoint) => {
      if (endpoint.includes('/products')) {
        const urlObj = new URL(`http://test-api.com${endpoint}`);
        const category = urlObj.searchParams.get('category');
        const sort = urlObj.searchParams.get('sort');

        let filteredProducts = [...mockProducts.content];

        if (category) {
          filteredProducts = filteredProducts.filter(
            (product) => product.category === category
          );
        }

        if (sort === 'price,desc') {
          filteredProducts.sort((a, b) => b.price - a.price);
        } else if (sort === 'price,asc') {
          filteredProducts.sort((a, b) => a.price - b.price);
        }

        return Promise.resolve({ content: filteredProducts });
      } else if (
        endpoint.includes('/cart-items') &&
        !endpoint.includes('DELETE')
      ) {
        return Promise.resolve(mockCartItems);
      }

      return Promise.resolve({});
    });

    vi.mock('react-dom', () => ({
      createPortal: (node: React.ReactNode) => node,
    }));
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('상품 목록을 불러와 렌더링한다', async () => {
    render(<ShoppingList />);

    await waitFor(() => {
      expect(screen.getByText(/상품 1/)).toBeTruthy();
    });

    expect(screen.getByText(/상품 2/)).toBeTruthy();
    expect(screen.getByText(/상품 3/)).toBeTruthy();

    expect(apiRequest).toHaveBeenCalledWith(
      expect.stringContaining('/products')
    );
    expect(apiRequest).toHaveBeenCalledWith(
      expect.stringContaining('/cart-items')
    );
  });

  it('카테고리 필터링이 작동한다', async () => {
    render(<ShoppingList />);

    await waitFor(() => {
      expect(screen.getByText(/상품 1/)).toBeTruthy();
    });

    vi.clearAllMocks();

    const categoryDropdown = screen.getByText('전체');
    fireEvent.click(categoryDropdown);

    const fashionCategory = screen.getByText('패션잡화');
    fireEvent.click(fashionCategory);

    expect(apiRequest).toHaveBeenCalledWith(
      expect.stringContaining('category=패션잡화')
    );
  });

  it('가격 정렬이 작동한다', async () => {
    render(<ShoppingList />);

    await waitFor(() => {
      expect(screen.getByText(/상품 1/)).toBeTruthy();
    });

    vi.clearAllMocks();

    const sortDropdown = screen.getByText('낮은 가격순');
    fireEvent.click(sortDropdown);

    const highPriceSort = screen.getByText('높은 가격순');
    fireEvent.click(highPriceSort);

    expect(apiRequest).toHaveBeenCalledWith(
      expect.stringContaining('sort=price,desc')
    );
  });
});
