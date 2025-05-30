import { fireEvent, render, screen } from '@testing-library/react';
import ProductList from '../components/Product/ProductList/ProductList';
import { setupServer } from 'msw/node';
import { handlers } from '../mocks/handler';
import { ErrorContextProvider } from '../contexts/ErrorContext';
import { ApiProvider } from '../contexts/ApiContext';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('ProductList 컴포넌트', () => {
  it('상품 목록이 렌더링된다', async () => {
    render(
      <ErrorContextProvider>
        <ApiProvider>
          <ProductList />
        </ApiProvider>
      </ErrorContextProvider>
    );

    expect(screen.getByText('전체')).toBeInTheDocument();
    expect(screen.getByText('낮은 가격순')).toBeInTheDocument();
  });
});

describe('ProductList 컴포넌트 필터링', () => {
  it('카테고리를 선택하면 해당 상품만 렌더링된다', async () => {
    render(
      <ErrorContextProvider>
        <ApiProvider>
          <ProductList />
        </ApiProvider>
      </ErrorContextProvider>
    );

    const categoryDropdown = screen.getByRole('button', { name: /전체/i });

    fireEvent.click(categoryDropdown);

    const option = await screen.findByText('식료품');
    fireEvent.click(option);
    const filteredItems = await screen.findAllByRole('listitem');

    expect(filteredItems.some((item) => item.textContent?.includes('아샷추'))).toBe(true);
  });
});

it('정렬 옵션에서 높은 가격순을 선택하면 상품들이 가격 내림차순으로 정렬된다.', async () => {
  render(
    <ErrorContextProvider>
      <ApiProvider>
        <ProductList />
      </ApiProvider>
    </ErrorContextProvider>
  );

  const orderDropdown = screen.getByRole('button', { name: /낮은 가격순/i });
  fireEvent.click(orderDropdown);

  const highPriceOption = await screen.findByText('높은 가격순');
  fireEvent.click(highPriceOption);

  const priceElements = await screen.findAllByTestId('product-price');
  const prices = priceElements.map((el) => el.textContent ?? '').map((text) => Number(text.replace(/[^0-9]/g, '')));

  const sorted = [...prices].sort((a, b) => b - a);

  expect(prices).toEqual(sorted);
});
