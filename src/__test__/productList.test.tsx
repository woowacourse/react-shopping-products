import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, it, expect} from 'vitest';
import App from '../App';
import {server} from '../mocks/node';
import {ApiProvider} from '../features/products/provider/apiProvider';
import {products} from '../mocks/mockData';
import {formatPrice} from '../shared/utils/formatPrice';

describe('GET Products', () => {
  beforeAll(() => server.listen());

  it('products GET 요청시 화면에 ProductList가 보인다.', async () => {
    render(
      <ApiProvider>
        <App />
      </ApiProvider>
    );
    await waitFor(() => {
      const productList = screen.getByTestId('product-list');
      expect(productList.children.length).toBe(20);
    });
  });

  it('product의 수량이 0개이면 품절 UI가 보인다.', async () => {
    render(
      <ApiProvider>
        <App />
      </ApiProvider>
    );

    await waitFor(() => {
      const productList = screen.getByTestId('product-list');
      const childrenArray = Array.from(productList.children);

      const soldOutIndex = childrenArray.findIndex((child) =>
        child.textContent?.includes('수량: 0')
      );
      expect(productList.children[soldOutIndex].textContent).toContain('품절');
    });
  });
});

describe('필터링 및 정렬 테스트', () => {
  beforeAll(() => server.listen());

  it('식료품 카테고리를 선택한 경우 식료품 ProductList가 보인다.', async () => {
    render(
      <ApiProvider>
        <App />
      </ApiProvider>
    );
    await waitFor(() => {
      const select = screen.getByTestId('category-select');
      userEvent.selectOptions(select, '식료품');

      const productList = screen.getByTestId('product-list');

      for (let i = 0; i < productList.children.length; i++) {
        expect(productList.children[i].textContent).toContain('식료품');
      }
    });
  });

  it('낮은 가격순을 클릭하면 오름차순으로 정렬된 ProductList가 보인다.', async () => {
    const cheapestPrice = formatPrice(
      Math.min(...products.content.map((product) => product.price))
    );
    const expensivePrice = formatPrice(
      Math.max(...products.content.map((product) => product.price))
    );

    render(
      <ApiProvider>
        <App />
      </ApiProvider>
    );
    await waitFor(() => {
      const select = screen.getByTestId('sort-select');
      userEvent.selectOptions(select, '낮은 가격순');

      const productList = screen.getByTestId('product-list');
      const firstItem = productList.children[0];
      const lastItem = productList.children[19];

      expect(firstItem.textContent).toContain(cheapestPrice);
      expect(lastItem.textContent).toContain(expensivePrice);
    });
  });
});

describe('상품 담기/빼기', () => {
  beforeEach(() => server.listen());

  it('상품을 담으면 헤더의 카트 아이템 수가 1 증가한다.', async () => {
    render(
      <ApiProvider>
        <App />
      </ApiProvider>
    );

    const beforeQuantity = (await screen.findByTestId('cart-quantity'))
      .textContent as string;

    const cartButton = await screen.findAllByText('담기');

    fireEvent.click(cartButton[0]);
    fireEvent.click(cartButton[0]);

    const afterQuantity = (await screen.findByTestId('cart-quantity'))
      .textContent as string;

    expect(parseInt(afterQuantity)).toEqual(parseInt(beforeQuantity) + 1);
  });

  it('상품을 빼면 헤더의 카트 아이템 수가 1 감소한다.', async () => {
    render(
      <ApiProvider>
        <App />
      </ApiProvider>
    );

    const beforeQuantity = (await screen.findByTestId('cart-quantity'))
      .textContent as string;

    const cartButton = await screen.findAllByText('빼기');

    fireEvent.click(cartButton[0]);

    const afterQuantity = (await screen.findByTestId('cart-quantity'))
      .textContent as string;

    expect(parseInt(afterQuantity)).toEqual(parseInt(beforeQuantity) - 1);
  });
});
