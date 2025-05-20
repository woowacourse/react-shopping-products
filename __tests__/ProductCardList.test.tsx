import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Product } from '../src/types/product.type';
import ShoppingCartProvider from '../src/contexts/ShoppingCartProvider';
import { ProductsContext } from '../src/contexts/ProductsProvider';
import { vi } from 'vitest';
import ProductListPage from '../src/pages/ProductListPage';

describe('상품 리스트 테스트', () => {
  const mockProducts: Product[] = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    name: `테스트 상품 ${index + 1}`,
    price: 1000 + index * 100,
    imageUrl: `/images/test${index + 1}.png`,
    category: index % 2 === 0 ? '식료품' : '패션잡화',
  }));

  const mockContextValue = {
    products: mockProducts,
    productsError: {
      is: false,
      message: '',
    },
    handleChangeProducts: vi.fn(),
    handleChangeSort: vi.fn(),
    handleChangeCategory: vi.fn(),
    isProductsLoading: false,
    sort: '낮은 가격순',
    category: '전체',
  };

  beforeEach(() => {
    render(
      <ProductsContext.Provider value={mockContextValue}>
        <ShoppingCartProvider>
          <ProductListPage />
        </ShoppingCartProvider>
      </ProductsContext.Provider>
    );
  });

  it('처음 페이지가 렌더링 되면 상품 리스트 개수는 20개여야 한다.', () => {
    const matchingElements = screen.getAllByText(/테스트 상품/);
    expect(matchingElements).toHaveLength(mockProducts.length);
  });

  describe('식료품 정렬 테스트', () => {
    it('높은 가격순으로 정렬할 수 있다.', () => {
      const filterSelect = screen.getByRole('combobox', { name: 'filter' });
      const sortSelect = screen.getByRole('combobox', { name: 'sorting' });
      fireEvent.change(filterSelect, { target: { value: '식료품' } });
      fireEvent.change(sortSelect, { target: { value: '높은 가격순' } });

      const expected = mockProducts
        .filter((product) => product.category === '식료품')
        .sort((a, b) => b.price - a.price)
        .map((product) => product.name);

      const rendered = screen
        .getAllByText(/테스트 상품/)
        .filter((_, index) => index % 2 === 0)
        .map((el) => el.textContent);
      expect(rendered).toEqual(expected);
    });

    it('낮은 가격순으로 정렬할 수 있다.', () => {
      const filterSelect = screen.getByRole('combobox', { name: 'filter' });
      const sortSelect = screen.getByRole('combobox', { name: 'sorting' });
      fireEvent.change(filterSelect, { target: { value: '식료품' } });
      fireEvent.change(sortSelect, { target: { value: '낮은 가격순' } });

      const expected = mockProducts
        .filter((product) => product.category === '식료품')
        .sort((a, b) => a.price - b.price)
        .map((product) => product.name);

      const rendered = screen
        .getAllByText(/테스트 상품/)
        .filter((_, index) => index % 2 === 0)
        .map((el) => el.textContent);
      expect(rendered).toEqual(expected);
    });
  });

  describe('패션잡화 정렬 테스트', () => {
    it('높은 가격순으로 정렬할 수 있다.', () => {
      const filterSelect = screen.getByRole('combobox', { name: 'filter' });
      const sortSelect = screen.getByRole('combobox', { name: 'sorting' });

      fireEvent.change(filterSelect, { target: { value: '패션잡화' } });
      fireEvent.change(sortSelect, { target: { value: '높은 가격순' } });

      const expected = mockProducts
        .filter((product) => product.category === '패션잡화')
        .sort((a, b) => b.price - a.price)
        .map((product) => product.name);

      const rendered = screen
        .getAllByText(/테스트 상품/)
        .filter((_, index) => index % 2 === 1)
        .map((el) => el.textContent);
      expect(rendered).toEqual(expected);
    });

    it('낮은 가격순으로 정렬할 수 있다.', () => {
      const filterSelect = screen.getByRole('combobox', { name: 'filter' });
      const sortSelect = screen.getByRole('combobox', { name: 'sorting' });
      fireEvent.change(filterSelect, { target: { value: '패션잡화' } });
      fireEvent.change(sortSelect, { target: { value: '낮은 가격순' } });

      const expected = mockProducts
        .filter((product) => product.category === '패션잡화')
        .sort((a, b) => a.price - b.price)
        .map((product) => product.name);

      const rendered = screen
        .getAllByText(/테스트 상품/)
        .filter((_, index) => index % 2 === 1)
        .map((el) => el.textContent);
      expect(rendered).toEqual(expected);
    });
  });
});
