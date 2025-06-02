import { fireEvent, render, screen, within } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { handlers } from '../mocks/handler';
import { ErrorContextProvider } from '../contexts/ErrorContext';
import { ApiProvider } from '../contexts/ApiContext';
import { CartItemResponse } from '../types/response';
import { URLS } from '../constants/url';
import App from '../App';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('장바구니에 있는 아이템 수만큼 숫자가 표시된다.', async () => {
  const res = await fetch(URLS.CART_ITEMS);
  const data: CartItemResponse = await res.json();
  const expectedLength = data.content.length;

  render(
    <ErrorContextProvider>
      <ApiProvider>
        <App />
      </ApiProvider>
    </ErrorContextProvider>
  );

  const cartCountElement = await screen.findByTestId('cart-count');
  expect(cartCountElement).toBeInTheDocument();
  expect(cartCountElement).toHaveTextContent(String(expectedLength));
});
it('헤더를 클릭하면 장바구니에 담긴 아이템들이 렌더링된다.', async () => {
  const res = await fetch(URLS.CART_ITEMS);
  const productItems: CartItemResponse = await res.json();

  render(
    <ErrorContextProvider>
      <ApiProvider>
        <App />
      </ApiProvider>
    </ErrorContextProvider>,
    { container: document.body }
  );

  const cartButton = await screen.findByAltText('cart-icon');
  fireEvent.click(cartButton);

  const modal = await screen.findByTestId('cart-modal');
  const cartItems = within(modal).getAllByRole('listitem');

  expect(cartItems).toHaveLength(productItems.content.length);
});

it('헤더를 클릭하면 모달에 합산 금액이 보여진다.', async () => {
  const res = await fetch(URLS.CART_ITEMS);
  const productItems: CartItemResponse = await res.json();

  render(
    <ErrorContextProvider>
      <ApiProvider>
        <App />
      </ApiProvider>
    </ErrorContextProvider>
  );

  const cartButton = await screen.findByAltText('cart-icon');
  fireEvent.click(cartButton);

  const totalPrice = productItems.content.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
  const totalPriceText = await screen.findByText(`${totalPrice.toLocaleString()}원`);

  expect(totalPriceText).toBeInTheDocument();
});
