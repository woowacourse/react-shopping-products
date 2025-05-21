import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Category, Product } from '../src/types/product.type';
import ProductCardList from '../src/components/ProductCardList/index';
import ShoppingCartProvider from '../src/contexts/ShoppingCartProvider';
import ProductsProvider from '../src/contexts/ProductsProvider';
import { useShoppingCartContext } from '../src/contexts/useShoppingCartContext';
import { useAddShoppingCart } from '../src/hooks/useAddShoppingCart';
import { useDeleteShoppingCart } from '../src/hooks/useDeleteShoppingCart';
import { describe, test, beforeEach, vi } from 'vitest';
import type { Mock } from 'vitest';

vi.mock('../src/contexts/useShoppingCartContext');
vi.mock('../src/hooks/useAddShoppingCart');
vi.mock('../src/hooks/useDeleteShoppingCart');

describe('장바구니 테스트', () => {
  const mockProducts: Product[] = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    name: `테스트 상품 ${index + 1}`,
    price: 1000 + index * 100,
    imageUrl: `/images/test${index + 1}.png`,
    category: (index % 2 === 0 ? '식료품' : '패션잡화') as Category,
  }));

  const mockAdd = vi.fn();
  const mockDelete = vi.fn();

  beforeEach(() => {
    (useShoppingCartContext as Mock).mockReturnValue({
      items: [
        {
          id: 999,
          product: mockProducts[0],
        },
      ],
    });

    (useAddShoppingCart as Mock).mockReturnValue(mockAdd);

    (useDeleteShoppingCart as Mock).mockReturnValue(mockDelete);
  });

  test('장바구니에 아이템을 담을 수 있다.', () => {
    render(
      <ProductsProvider>
        <ShoppingCartProvider>
          <ProductCardList products={mockProducts} />
        </ShoppingCartProvider>
      </ProductsProvider>
    );

    const addButtons = screen.getAllByRole('button', { name: /담기/i });
    fireEvent.click(addButtons[0]);
    expect(mockAdd).toHaveBeenCalled();
  });

  test('장바구니에서 아이템을 삭제할 수 있다.', () => {
    render(
      <ProductsProvider>
        <ShoppingCartProvider>
          <ProductCardList products={mockProducts} />
        </ShoppingCartProvider>
      </ProductsProvider>
    );

    const removeButtons = screen.getAllByRole('button', { name: /빼기/i });
    fireEvent.click(removeButtons[0]);
    expect(mockDelete).toHaveBeenCalled();
  });
});
