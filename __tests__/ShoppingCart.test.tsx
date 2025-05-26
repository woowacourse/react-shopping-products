import React from 'react';
import { setupServer } from 'msw/node';
import { fireEvent, render, screen } from '@testing-library/react';
import ProductCardList from '../src/components/ProductCardList/index';
import { describe, test, beforeEach, vi } from 'vitest';
import type { Mock } from 'vitest';
import { useShoppingCart } from '../src/hooks/useShoppingCart';
import DataProvider from '../src/contexts/DataContextProvider';
import mockProducts from '../src/mocks/products.json';
import { Category } from '../src/components/ProductCardList/product.type';

vi.mock('../src/hooks/useShoppingCart');

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('장바구니 테스트', () => {
  const mockAdd = vi.fn();
  const mockDelete = vi.fn();
  const mockUpdate = vi.fn();

  beforeEach(() => {
    (useShoppingCart as Mock).mockReturnValue({
      data: [{ id: 999, product: mockProducts[0], quantity: 1 }],
      loading: false,
      error: null,
      add: mockAdd,
      remove: mockDelete,
      update: mockUpdate,
    });

    render(
      <DataProvider>
        <ProductCardList
          products={mockProducts.map((product) => ({
            ...product,
            category: product.category as Category,
          }))}
        />
      </DataProvider>
    );
  });

  test('장바구니에 아이템을 담을 수 있다.', () => {
    const addButtons = screen.getAllByRole('button', { name: /담기/i });
    fireEvent.click(addButtons[0]);
    expect(mockAdd).not.toThrow();
  });

  test('장바구니에서 아이템을 삭제할 수 있다.', () => {
    const removeButtons = screen.getAllByRole('button', { name: /-/i });
    fireEvent.click(removeButtons[0]);
    expect(mockDelete).toHaveBeenCalled();
  });

  test('장바구니에 아이템을 추가할 수 있다.', () => {
    const quantitySpinners = screen.getAllByRole('button', { name: /\+/i });
    fireEvent.click(quantitySpinners[0]);
    expect(mockUpdate).toHaveBeenCalled();
  });
});
