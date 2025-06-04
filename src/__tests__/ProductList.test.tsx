import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { handlers } from '../mocks/handler';
import { ErrorContextProvider } from '../contexts/ErrorContext';
import { ApiProvider } from '../contexts/ApiContext';
import App from '../App';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('ProductList 컴포넌트', () => {
  it('상품 목록이 렌더링된다', async () => {
    render(
      <ErrorContextProvider>
        <ApiProvider>
          <App />
        </ApiProvider>
      </ErrorContextProvider>
    );

    expect(screen.getByText('전체')).toBeInTheDocument();
    expect(screen.getByText('낮은 가격순')).toBeInTheDocument();
  });
});

describe('필터링', () => {
  it('카테고리를 선택하면 해당 상품만 렌더링된다', async () => {
    render(
      <ErrorContextProvider>
        <ApiProvider>
          <App />
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
        <App />
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

describe('담기 버튼 클릭 시', () => {
  it('상품 목록에서 담기 버튼을 누르면, 수량을 조절할 수 있다.', async () => {
    render(
      <ErrorContextProvider>
        <ApiProvider>
          <App />
        </ApiProvider>
      </ErrorContextProvider>
    );

    const addButtons = await screen.findAllByRole('button', { name: '담기' });
    fireEvent.click(addButtons[0]);

    const plusImages = await screen.findAllByAltText('수량 증가');

    const plusButton = plusImages[0].closest('button');
    fireEvent.click(plusButton!);

    const quantity = await screen.findByText('2');
    expect(quantity).toBeInTheDocument();
  });
});

it('상품의 수량을 초과하여 담을 수 없다.', async () => {
  render(
    <ErrorContextProvider>
      <ApiProvider>
        <App />
      </ApiProvider>
    </ErrorContextProvider>
  );

  const addButtons = await screen.findAllByRole('button', { name: '담기' });
  fireEvent.click(addButtons[0]);

  const plusButtons = await screen.findAllByAltText('수량 증가');
  const plusButton = plusButtons[0].closest('button')!;

  for (let i = 0; i < 5; i++) {
    await waitFor(() => {
      fireEvent.click(plusButton);
    });
  }

  fireEvent.click(plusButton);

  const quantityElements = await screen.findAllByTestId('product-quantity');
  expect(quantityElements[0]).toHaveTextContent('5');
});
