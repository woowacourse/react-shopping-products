import '@testing-library/jest-dom';
import { vi } from 'vitest';
import type { Mock } from 'vitest';
import { getProducts } from '../../services/productServices';
import type { ProductItemType } from '../../types/data';
import { render, screen } from '@testing-library/react';
import { ProductListPage } from './ProductListPage';
import { CartProvider } from '../../context/CartContext';
import { ErrorMessageProvider } from '../../context/ErrorMessageContext';
import { PRODUCT_LIST_ITEM_COUNT } from '../../constants/systemConstants';
import type React from 'react';
import { useState } from 'react';
import userEvent from '@testing-library/user-event';
import useCartItems from '../../hooks/useCartItems';
import type { CartItemType } from '../../types/data';

const mockProducts: ProductItemType[] = Array.from({ length: 25 }, (_, index) => ({
  id: index + 1,
  name: `상품 ${index + 1}`,
  category: index % 2 === 0 ? '식료품' : '패션잡화',
  price: 1000 + index * 100,
  imageUrl: `/images/product-${index + 1}.jpg`,
  quantity: 1,
}));

const TestCartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems] = useState<CartItemType[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const handleErrorMessage = (message: string) => {
    setErrorMessage(message);
  };

  const { handleAddCartItems, handleRemoveCartItems, handleUpdateCartItems } = useCartItems({
    handleErrorMessage,
  });

  return (
    <CartProvider
      cartItems={cartItems}
      handleAddCartItems={handleAddCartItems}
      handleRemoveCartItems={handleRemoveCartItems}
      handleUpdateCartItems={handleUpdateCartItems}
    >
      <ErrorMessageProvider errorMessage={errorMessage} handleErrorMessage={setErrorMessage}>
        {children}
      </ErrorMessageProvider>
    </CartProvider>
  );
};

vi.mock('../../services/productServices', () => ({
  getProducts: vi.fn(),
}));

describe('상품 목록 조회 테스트', () => {
  beforeEach(() => {
    (getProducts as Mock).mockClear();
    (getProducts as Mock).mockImplementation((category, sort) => {
      let result = [...mockProducts];
      if (category && category !== '전체') {
        result = result.filter((p) => p.category === category);
      }
      if (sort === 'desc') {
        result = result.sort((a, b) => b.price - a.price);
      } else if (sort === 'asc') {
        result = result.sort((a, b) => a.price - b.price);
      }
      return Promise.resolve(result.slice(0, PRODUCT_LIST_ITEM_COUNT));
    });
  });

  it('최대 20개의 상품을 렌더링할 수 있다.', async () => {
    (getProducts as Mock).mockResolvedValueOnce(mockProducts);

    render(
      <TestCartProvider>
        <ProductListPage />
      </TestCartProvider>,
    );
    const items = await screen.findAllByText(/상품 \d+/);
    expect(items).toHaveLength(PRODUCT_LIST_ITEM_COUNT);
  });

  it('api 요청 실패 시, 에러 메시지가 나타난다.', async () => {
    const ERROR_MESSAGE = 'API Error';
    (getProducts as Mock).mockRejectedValueOnce(new Error(ERROR_MESSAGE));

    render(
      <TestCartProvider>
        <ProductListPage />
      </TestCartProvider>,
    );
    const error = await screen.findByTestId('error-message');
    expect(error).toHaveTextContent(ERROR_MESSAGE);
  });

  it('api 요청 중에는 스켈레톤이 표시된다.', async () => {
    const pendingPromise = new Promise<ProductItemType[]>(() => {});
    (getProducts as Mock).mockReturnValueOnce(pendingPromise);

    render(
      <TestCartProvider>
        <ProductListPage />
      </TestCartProvider>,
    );
    expect(screen.getByTestId('product-list-skeleton')).toBeInTheDocument();
  });
});

describe('상품 정렬 및 필터링 테스트', () => {
  it('카테고리 필터링 기능이 작동한다.', async () => {
    render(
      <TestCartProvider>
        <ProductListPage />
      </TestCartProvider>,
    );

    // 최초 렌더링 완료 대기
    await screen.findAllByTestId('product-name');

    const categorySelect = await screen.findByRole('button', { name: '전체' });
    await userEvent.click(categorySelect);

    const fashionOption = await screen.findByText('패션잡화');
    await userEvent.click(fashionOption);

    await screen.findAllByTestId('product-name');

    const fashionProducts = mockProducts
      .filter((p) => p.category === '패션잡화')
      .slice(0, PRODUCT_LIST_ITEM_COUNT);
    for (const product of fashionProducts) {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    }

    const foodProducts = mockProducts.filter((p) => p.category === '식료품');
    for (const product of foodProducts) {
      expect(screen.queryByText(product.name)).not.toBeInTheDocument();
    }
  });

  it('가격 정렬 기능이 작동한다.', async () => {
    render(
      <TestCartProvider>
        <ProductListPage />
      </TestCartProvider>,
    );

    await screen.findAllByTestId('product-name');

    const sortSelect = await screen.findByRole('button', { name: '높은 가격순' });
    await userEvent.click(sortSelect);

    const lowToHighOption = await screen.findByText('낮은 가격순');
    await userEvent.click(lowToHighOption);

    await screen.findAllByTestId('product-name');

    const sorted = [...mockProducts]
      .sort((a, b) => a.price - b.price)
      .slice(0, PRODUCT_LIST_ITEM_COUNT);
    const productNames = sorted.map((p) => p.name);
    const renderedNames = (await screen.findAllByTestId('product-name')).map(
      (el) => el.textContent,
    );
    expect(renderedNames).toEqual(productNames);
  });
});
