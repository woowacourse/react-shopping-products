import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
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

it('모달에서 수량을 조절하면 합산 금액이 실시간으로 변경된다.', async () => {
  // Given: 앱이 렌더링되고 장바구니 모달이 열려 있음
  render(
    <ErrorContextProvider>
      <ApiProvider>
        <App />
      </ApiProvider>
    </ErrorContextProvider>
  );
  const cartButton = await screen.findByAltText('cart-icon');
  fireEvent.click(cartButton);

  const totalPriceLabel = await screen.findByText(/총 결제 금액/i);
  const totalBefore = parseInt(totalPriceLabel.nextSibling?.textContent?.replace(/[^\d]/g, '') ?? '0', 10);

  // When: 수량 증가 버튼을 클릭했을 때
  const plusButtons = await screen.findAllByAltText('수량 증가');
  fireEvent.click(plusButtons[0].closest('button')!);

  // Then: 총 결제 금액이 증가한다
  await waitFor(() => {
    const totalAfter = parseInt(totalPriceLabel.nextSibling?.textContent?.replace(/[^\d]/g, '') ?? '0', 10);
    expect(totalAfter).toBeGreaterThan(totalBefore);
  });
});

it('모달에서 아이템을 제거하면 목록과 총 금액이 업데이트된다.', async () => {
  // Given: 앱이 렌더링되고 장바구니 모달이 열려 있음
  render(
    <ErrorContextProvider>
      <ApiProvider>
        <App />
      </ApiProvider>
    </ErrorContextProvider>
  );
  const cartButton = await screen.findByAltText('cart-icon');
  fireEvent.click(cartButton);

  const initialItems = await screen.findAllByRole('listitem');
  const totalPriceLabel = await screen.findByText(/총 결제 금액/i);
  const totalBefore = parseInt(totalPriceLabel.nextSibling?.textContent?.replace(/[^\d]/g, '') ?? '0', 10);

  // When: 첫 번째 아이템 제거 버튼을 클릭했을 때
  const removeButtons = await screen.findAllByRole('button', { name: /삭제/i });
  fireEvent.click(removeButtons[0]);

  // Then: 아이템 수와 총 결제 금액이 감소한다
  await waitFor(async () => {
    const updatedItems = await screen.findAllByRole('listitem');
    expect(updatedItems.length).toBeLessThan(initialItems.length);

    const totalAfter = parseInt(totalPriceLabel.nextSibling?.textContent?.replace(/[^\d]/g, '') ?? '0', 10);
    expect(totalAfter).toBeLessThan(totalBefore);
  });
});
