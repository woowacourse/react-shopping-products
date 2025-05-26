import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ShoppingList from './index';
import { fireEvent } from '@testing-library/react';

const defaultMockData = [
  {
    id: 1,
    name: '상품 1',
    price: 10000,
    imageUrl: 'image1.jpg',
    category: '패션잡화',
    quantity: 10,
  },
  {
    id: 2,
    name: '상품 2',
    price: 20000,
    imageUrl: 'image2.jpg',
    category: '패션잡화',
    quantity: 15,
  },
  {
    id: 3,
    name: '상품 3',
    price: 5000,
    imageUrl: 'image3.jpg',
    category: '식료품',
    quantity: 20,
  },
];

const mockHandleSortClick = vi.fn();
const mockHandleCategoryClick = vi.fn();

vi.mock('../../hook/useShoppingItemList', () => ({
  default: () => ({
    data: defaultMockData,
    handleSortClick: mockHandleSortClick,
    handleCategoryClick: mockHandleCategoryClick,
    selected: '낮은 가격순',
    category: '전체',
    error: null,
    isLoading: false,
    retryFetch: vi.fn(),
  }),
}));

vi.mock('../../hook/useCartManager', () => ({
  default: () => ({
    cartData: [
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
    handleAddCart: vi.fn(),
    handleRemoveCart: vi.fn(),
  }),
}));

describe('ShoppingList 컴포넌트', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mock('react-dom', () => ({
      createPortal: (node: React.ReactNode) => node,
    }));
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('상품 목록을 불러와 렌더링한다', async () => {
    render(<ShoppingList />);

    expect(screen.getByText('상품 1')).toBeTruthy();
    expect(screen.getByText('상품 2')).toBeTruthy();
    expect(screen.getByText('상품 3')).toBeTruthy();
  });

  it('카테고리 필터링이 작동한다', async () => {
    render(<ShoppingList />);

    const categoryDropdown = screen.getByText('전체');
    fireEvent.click(categoryDropdown);

    const fashionCategory = screen.getByText('패션잡화');
    fireEvent.click(fashionCategory);

    expect(mockHandleCategoryClick).toHaveBeenCalledWith('패션잡화');
  });

  it('가격 정렬이 작동한다', async () => {
    render(<ShoppingList />);

    const sortDropdown = screen.getByText('낮은 가격순');
    fireEvent.click(sortDropdown);

    const highPriceSort = screen.getByText('높은 가격순');
    fireEvent.click(highPriceSort);

    expect(mockHandleSortClick).toHaveBeenCalledWith('높은 가격순');
  });
});
