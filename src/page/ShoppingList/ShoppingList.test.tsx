import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import ShoppingList from './index';
import { fireEvent } from '@testing-library/react';

// Mock 데이터
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
  content: [{ id: 1, productId: 1, quantity: 1 }],
};

// 전역 fetch 모킹
const originalFetch = global.fetch;

describe('ShoppingList 컴포넌트', () => {
  beforeEach(() => {
    // fetch 모킹 설정
    global.fetch = vi.fn().mockImplementation((url) => {
      if (url.includes('/products')) {
        // URL에서 쿼리 파라미터 파싱
        const urlObj = new URL(url);
        const category = urlObj.searchParams.get('category');
        const sort = urlObj.searchParams.get('sort');

        let filteredProducts = [...mockProducts.content];

        // 카테고리 필터링
        if (category) {
          filteredProducts = filteredProducts.filter(
            (product) => product.category === category
          );
        }

        // 정렬
        if (sort === 'price,desc') {
          filteredProducts.sort((a, b) => b.price - a.price);
        } else if (sort === 'price,asc') {
          filteredProducts.sort((a, b) => a.price - b.price);
        }

        return Promise.resolve({
          json: () => Promise.resolve({ content: filteredProducts }),
        });
      } else if (url.includes('/cart-items')) {
        return Promise.resolve({
          json: () => Promise.resolve(mockCartItems),
        });
      }

      return Promise.reject(new Error('Not found'));
    });

    // 환경 변수 모킹
    vi.stubEnv('VITE_API_BASE_URL', 'http://test-api.com');
    vi.stubEnv('VITE_API_KEY', 'test-api-key');

    // createPortal 모킹
    vi.mock('react-dom', () => ({
      createPortal: (node: React.ReactNode) => node,
    }));
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.unstubAllEnvs();
    vi.resetAllMocks();
  });

  it('상품 목록을 불러와 렌더링한다', async () => {
    render(<ShoppingList />);

    // 상품 로딩 대기
    await waitFor(() => {
      expect(screen.getByText(/상품 1/)).toBeTruthy();
    });

    // 모든 상품이 렌더링되었는지 확인
    expect(screen.getByText(/상품 2/)).toBeTruthy();
    expect(screen.getByText(/상품 3/)).toBeTruthy();

    // fetch가 호출되었는지 확인
    expect(global.fetch).toHaveBeenCalledTimes(2); // 상품 목록과 장바구니 API 호출
  });

  it('카테고리 필터링이 작동한다', async () => {
    render(<ShoppingList />);

    // 초기 상태 대기
    await waitFor(() => {
      expect(screen.getByText(/상품 1/)).toBeTruthy();
    });

    // fetch 호출 초기화
    vi.clearAllMocks();

    // 카테고리 드롭다운 열기
    const categoryDropdown = screen.getByText('전체');
    fireEvent.click(categoryDropdown);

    // '패션잡화' 카테고리 선택
    const fashionCategory = screen.getByText('패션잡화');
    fireEvent.click(fashionCategory);

    // API 호출 확인
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('category=패션잡화'),
      expect.anything()
    );
  });

  it('가격 정렬이 작동한다', async () => {
    render(<ShoppingList />);

    // 초기 상태 대기
    await waitFor(() => {
      expect(screen.getByText(/상품 1/)).toBeTruthy();
    });

    // fetch 호출 초기화
    vi.clearAllMocks();

    // 정렬 드롭다운 열기
    const sortDropdown = screen.getByText('낮은 가격순');
    fireEvent.click(sortDropdown);

    // '높은 가격순' 선택
    const highPriceSort = screen.getByText('높은 가격순');
    fireEvent.click(highPriceSort);

    // API 호출 확인
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('sort=price,desc'),
      expect.anything()
    );
  });
});
