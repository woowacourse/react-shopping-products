import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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

    await waitFor(() => {
      expect(screen.getByText('패셔니스타 유담이')).toBeInTheDocument();
    });
  });
});

it('카테고리를 선택하면 해당 카테고리에 속한 상품만 렌더링된다', async () => {
  render(
    <ErrorContextProvider>
      <ApiProvider>
        <ProductList />
      </ApiProvider>
    </ErrorContextProvider>
  );

  await waitFor(() => {
    expect(screen.getByText('패셔니스타 유담이')).toBeInTheDocument();
  });

  screen.getByText('식료품').click();

  await waitFor(() => {
    expect(screen.getByText('얌샘김밥')).toBeInTheDocument();
  });

  expect(screen.queryByText('패셔니스타 유담이')).not.toBeInTheDocument();
});

it('낮은 가격순으로 정렬하면 저가 상품이 먼저 나온다', async () => {
  render(
    <ErrorContextProvider>
      <ApiProvider>
        <ProductList />
      </ApiProvider>
    </ErrorContextProvider>
  );

  await waitFor(() => {
    expect(screen.getByText('패셔니스타 유담이')).toBeInTheDocument();
  });

  const prices = screen
    .getAllByText(/원$/)
    .map((el) => parseInt(el.textContent?.replace(/,/g, '').replace('원', '') ?? '0'));
  const sortedPrices = [...prices].sort((a, b) => a - b);

  expect(prices).toEqual(sortedPrices);
});

describe('ProductList 장바구니 토글', () => {
  it('상품 담기 → 빼기 → 다시 담기가 정상 동작한다', async () => {
    render(
      <ErrorContextProvider>
        <ApiProvider>
          <ProductList />
        </ApiProvider>
      </ErrorContextProvider>
    );

    const addButton = await screen.findByRole('button', { name: /담기/i });

    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /빼기/i })).toBeInTheDocument();
    });

    const removeButton = screen.getByRole('button', { name: /빼기/i });
    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /담기/i })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /담기/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /빼기/i })).toBeInTheDocument();
    });
  });
});
