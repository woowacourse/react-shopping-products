import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, it, vi, beforeEach, expect, Mock} from 'vitest';
import * as productAPI from '../features/products/api/getProducts';
import * as cartAPI from '../features/cart/api/getCartProduct';
import App from '../App';

const generateMockProducts = (count: number) => ({
  content: Array.from({length: count}, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: (i + 1) * 1000,
    category: i < count / 2 ? '식료품' : '패션용품',
    imageUrl: `/image-${i + 1}.png`,
  })),
  totalElements: count,
  totalPages: 1,
});

const mockCartResponse = {
  content: [],
};

vi.mock('../features/products/api/getProducts', () => ({
  getProducts: vi.fn(),
}));

vi.mock('../features/cart/api/getCartProduct', () => ({
  getCartProduct: vi.fn(),
}));

describe('GET Products', () => {
  beforeEach(() => {
    (productAPI.getProducts as Mock).mockResolvedValue(
      generateMockProducts(20)
    );

    (cartAPI.getCartProduct as Mock).mockResolvedValue(mockCartResponse);
  });

  it('products GET 요청시 화면에 ProductList가 보인다.', async () => {
    render(<App />);
    await waitFor(() => {
      const productList = screen.getByTestId('product-list');
      expect(productList.children.length).toBe(20);
    });
  });

  it('product 카테고리에 따라 필터링된 ProductList가 보인다.', async () => {
    render(<App />);
    await waitFor(() => {
      const select = screen.getByTestId('category-select');
      userEvent.selectOptions(select, '식료품');

      const productList = screen.getByTestId('product-list');

      for (let i = 0; i < productList.children.length; i++) {
        expect(productList.children[i].textContent).toContain('식료품');
      }

      expect(productList.children.length).toBe(10);
    });
  });
});

describe('카테고리 필터링 테스트', () => {
  beforeEach(() => {
    (productAPI.getProducts as Mock).mockImplementation(({sortValue}) => {
      const products = generateMockProducts(20);
      if (sortValue === '낮은 가격순') {
        products.content.sort((a, b) => a.price - b.price);
      }
      return Promise.resolve(products);
    });
  });

  it('정렬 select에서 낮은 가격순을 클릭하면 오름차순으로 정렬된 ProductList가 보인다.', async () => {
    render(<App />);
    await waitFor(() => {
      const select = screen.getByTestId('sort-select');
      userEvent.selectOptions(select, '낮은 가격순');

      const productList = screen.getByTestId('product-list');
      const firstItem = productList.children[0];
      const lastItem = productList.children[19];

      expect(firstItem.textContent).toContain('1000');
      expect(lastItem.textContent).toContain('20000');
    });
  });
});
