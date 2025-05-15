import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import * as getProductsModule from '../src/api/getProducts';
import * as getCartItemsModule from '../src/api/getCartItems';
import * as postCartItemsModule from '../src/api/postCartItems';
import * as deleteCartItemsModule from '../src/api/deleteCartItems';
import App from '../src/App';

vi.mock('../src/api/getProducts', () => ({ default: vi.fn() }));
vi.mock('../src/api/getCartItems', () => ({ default: vi.fn() }));
vi.mock('../src/api/postCartItems', () => ({ default: vi.fn() }));
vi.mock('../src/api/deleteCartItems', () => ({ default: vi.fn() }));

describe('App 컴포넌트 - 에러 메시지 테스트', () => {
  it('상품 목록 불러오기에 실패할 경우 에러 메시지가 표시된다.', async () => {
    const mockedGetProducts = getProductsModule.default as ReturnType<typeof vi.fn>;
    const mockedGetCartItems = getCartItemsModule.default as ReturnType<typeof vi.fn>;

    mockedGetProducts.mockResolvedValue({
      data: null,
      newErrorMessage: '상품 목록을 불러오지 못했습니다. 다시 시도해주세요',
    });

    mockedGetCartItems.mockResolvedValue({
      data: null,
      newErrorMessage: '',
    });

    render(<App />);

    const errorElement = await screen.findByText(
      '상품 목록을 불러오지 못했습니다. 다시 시도해주세요'
    );
    expect(errorElement).toBeTruthy();
  });

  it('상품 담기에 실패하면 에러 메시지가 표시된다.', async () => {
    const mockedGetProducts = getProductsModule.default as ReturnType<typeof vi.fn>;
    const mockedGetCartItems = getCartItemsModule.default as ReturnType<typeof vi.fn>;
    const mockedPostCartItems = postCartItemsModule.default as ReturnType<typeof vi.fn>;

    mockedGetProducts.mockResolvedValue({
      data: {
        content: [
          {
            id: 1,
            name: '에러 상품',
            price: 1000,
            imageUrl: '',
            category: '식료품',
          },
        ],
      },
      newErrorMessage: '',
    });

    mockedGetCartItems.mockResolvedValue({
      data: { content: [] },
      newErrorMessage: '',
    });

    mockedPostCartItems.mockResolvedValue({
      newErrorMessage: '상품을 장바구니에 담지 못했습니다.',
    });

    render(<App />);

    const productButton = await screen.findByRole('button', { name: /담기/i });
    fireEvent.click(productButton);

    const errorElement = await screen.findByText('상품을 장바구니에 담지 못했습니다.');
    expect(errorElement).toBeTruthy();
  });

  it('상품 삭제에 실패하면 에러 메시지가 표시된다.', async () => {
    const mockedGetProducts = getProductsModule.default as ReturnType<typeof vi.fn>;
    const mockedGetCartItems = getCartItemsModule.default as ReturnType<typeof vi.fn>;
    const mockedDeleteCartItems = deleteCartItemsModule.default as ReturnType<typeof vi.fn>;

    mockedGetProducts.mockResolvedValue({
      data: {
        content: [
          {
            id: 1,
            name: '에러 상품',
            price: 1000,
            imageUrl: '',
            category: '식료품',
          },
        ],
      },
      newErrorMessage: '',
    });

    mockedGetCartItems.mockResolvedValue({
      data: {
        content: [
          {
            id: 100,
            quantity: 1,
            product: {
              id: 1,
              name: '에러 상품',
              price: 1000,
              imageUrl: '',
              category: '식료품',
            },
          },
        ],
      },
      newErrorMessage: '',
    });

    mockedDeleteCartItems.mockResolvedValue({
      data: null,
      newErrorMessage: '장바구니에서 상품을 삭제하지 못했습니다. 다시 시도해주세요',
    });

    render(<App />);

    const removeButton = await screen.findByRole('button', { name: /삭제|빼기|제거|Remove/i });
    fireEvent.click(removeButton);

    const errorElement = await screen.findByText(
      '장바구니에서 상품을 삭제하지 못했습니다. 다시 시도해주세요'
    );
    expect(errorElement).toBeTruthy();
  });
});
