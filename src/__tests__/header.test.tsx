import { render, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { handlers } from '../mocks/handler';
import HomeHeader from '../components/Header/HomeHeader';
import { ErrorContextProvider } from '../contexts/ErrorContext';
import { ApiProvider } from '../contexts/ApiContext';
import { CartItemResponse } from '../types/response';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('장바구니에 있는 아이템 수만큼 숫자가 표시된다.', async () => {
  const res = await fetch('/cart-items');
  const data: CartItemResponse = await res.json();
  const expectedLength = data.content.length;

  render(
    <ErrorContextProvider>
      <ApiProvider>
        <HomeHeader />
      </ApiProvider>
    </ErrorContextProvider>
  );

  const cartCountElement = await screen.findByTestId('cart-count');
  expect(cartCountElement).toBeInTheDocument();
  expect(cartCountElement).toHaveTextContent(String(expectedLength));
});
