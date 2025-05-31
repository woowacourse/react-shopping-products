import '@testing-library/jest-dom';
import { vi } from 'vitest';
import type { Mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductListPage } from './ProductListPage';
import { DataProvider } from '../../context/DataContext';
import { ErrorMessageProvider } from '../../context/ErrorMessageContext';
import { PRODUCT_LIST_ITEM_COUNT } from '../../constants/systemConstants';
import type React from 'react';
import { useState } from 'react';
import userEvent from '@testing-library/user-event';
import useCartItems from '../../hooks/features/useCartItems';
import type { CartItemType, ProductItemType } from '../../types/data';
import useProductHandler from '../../hooks/features/useProductHandler';
import useDataContext from '../../hooks/useDataContext';

vi.mock('../../hooks/features/useProductHandler');
vi.mock('../../hooks/useDataContext');
vi.mock('../../hooks/features/useCartItems');

const mockProducts: ProductItemType[] = Array.from({ length: 25 }, (_, index) => ({
  id: index + 1,
  name: `상품 ${index + 1}`,
  category: index % 2 === 0 ? '식료품' : '패션잡화',
  price: 1000 + index * 100,
  imageUrl: `/images/product-${index + 1}.jpg`,
  quantity: 1,
}));

const mockCartItems: CartItemType[] = [];

const mockDataResource = {
  cartItemsResource: {
    data: mockCartItems,
    loadingState: 'success' as const,
    error: null,
    refetch: vi.fn(),
  },
  productItemsResource: {
    data: mockProducts,
    loadingState: 'success' as const,
    error: null,
    refetch: vi.fn(),
  },
};

const TestProviders = ({
  children,
  initialErrorMessage = '',
}: {
  children: React.ReactNode;
  initialErrorMessage?: string;
}) => {
  const [errorMessage, setErrorMessage] = useState(initialErrorMessage);

  return (
    <DataProvider dataResource={mockDataResource}>
      <ErrorMessageProvider
        errorMessage={errorMessage}
        handleErrorMessage={setErrorMessage}
        isToastVisible={true}
      >
        {children}
      </ErrorMessageProvider>
    </DataProvider>
  );
};

describe('상품 목록 조회 테스트', () => {
  beforeEach(() => {
    (useProductHandler as Mock).mockReturnValue({
      products: mockProducts,
      loadingState: 'success',
      categoryOption: '전체',
      sortOption: '높은 가격순',
      handleCategoryOption: vi.fn(),
      handleSortOption: vi.fn(),
    });

    (useDataContext as Mock).mockReturnValue(mockDataResource);

    (useCartItems as Mock).mockReturnValue({
      handleAddCartItems: vi.fn(),
      handleRemoveCartItems: vi.fn(),
      handleUpdateCartItems: vi.fn(),
    });
  });

  it('최대 20개의 상품을 렌더링할 수 있다.', async () => {
    render(
      <TestProviders>
        <ProductListPage />
      </TestProviders>,
    );
    const items = await screen.findAllByText(/상품 \d+/);
    expect(items).toHaveLength(PRODUCT_LIST_ITEM_COUNT);
  });

  it('초기 로딩 중에는 스켈레톤이 표시된다.', () => {
    (useProductHandler as Mock).mockReturnValue({
      products: [],
      loadingState: 'loadingInitial',
      categoryOption: '전체',
      sortOption: '높은 가격순',
      handleCategoryOption: vi.fn(),
      handleSortOption: vi.fn(),
    });

    render(
      <TestProviders>
        <ProductListPage />
      </TestProviders>,
    );
    expect(screen.getByTestId('product-list-skeleton')).toBeInTheDocument();
  });

  it('필터링 로딩 중에는 opacity가 낮아진다.', () => {
    (useProductHandler as Mock).mockReturnValue({
      products: mockProducts,
      loadingState: 'loadingFilter',
      categoryOption: '전체',
      sortOption: '높은 가격순',
      handleCategoryOption: vi.fn(),
      handleSortOption: vi.fn(),
    });

    render(
      <TestProviders>
        <ProductListPage />
      </TestProviders>,
    );
    expect(screen.getByTestId('product-list-container')).toHaveStyle({
      opacity: '0.4',
    });
  });

  it('에러가 발생할 경우, 에러 메시지가 표시된다.', () => {
    const errorMessage = 'API Error';
    (useProductHandler as Mock).mockReturnValue({
      products: [],
      loadingState: 'success',
      categoryOption: '전체',
      sortOption: '높은 가격순',
      handleCategoryOption: vi.fn(),
      handleSortOption: vi.fn(),
    });

    render(
      <TestProviders initialErrorMessage={errorMessage}>
        <ProductListPage />
      </TestProviders>,
    );
    expect(screen.getByTestId('error-message')).toHaveTextContent(errorMessage);
  });
});

describe('상품 정렬 및 필터링 테스트', () => {
  const mockHandleCategoryOption = vi.fn();
  const mockHandleSortOption = vi.fn();

  beforeEach(() => {
    (useProductHandler as Mock).mockReturnValue({
      products: mockProducts,
      loadingState: 'success',
      categoryOption: '전체',
      sortOption: '높은 가격순',
      handleCategoryOption: mockHandleCategoryOption,
      handleSortOption: mockHandleSortOption,
    });

    (useDataContext as Mock).mockReturnValue(mockDataResource);

    (useCartItems as Mock).mockReturnValue({
      handleAddCartItems: vi.fn(),
      handleRemoveCartItems: vi.fn(),
      handleUpdateCartItems: vi.fn(),
    });
  });

  it('카테고리 필터링 기능이 작동한다.', async () => {
    render(
      <TestProviders>
        <ProductListPage />
      </TestProviders>,
    );

    const categorySelect = await screen.findByRole('button', { name: '전체' });
    await userEvent.click(categorySelect);

    const fashionOption = await screen.findByText('패션잡화');
    await userEvent.click(fashionOption);

    expect(mockHandleCategoryOption).toHaveBeenCalledWith('패션잡화');
  });

  it('가격 정렬 기능이 작동한다.', async () => {
    render(
      <TestProviders>
        <ProductListPage />
      </TestProviders>,
    );

    const sortSelect = await screen.findByRole('button', {
      name: '높은 가격순',
    });
    await userEvent.click(sortSelect);

    const lowToHighOption = await screen.findByText('낮은 가격순');
    await userEvent.click(lowToHighOption);

    expect(mockHandleSortOption).toHaveBeenCalledWith('낮은 가격순');
  });
});
