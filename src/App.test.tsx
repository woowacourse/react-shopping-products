import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { handlers } from './api/mock/handlers';
import { CartProvider } from './pages/productListPage/context/useCartContext';
import ProductListPage from './pages/productListPage/ProductListPage';
import ErrorBox from './components/common/ErrorBox/ErrorBox';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('초기 로딩 시 로딩 스피너가 표시되어야 한다', () => {
  render(
    <CartProvider>
      <ProductListPage />
      <ErrorBox
        backgroundColor='
#FFC9C9'
      />
    </CartProvider>
  );
  expect(screen.getByRole('status', { name: '로딩 중' })).toBeInTheDocument();
});

it('상품 목록이 로드되면 로딩 스피너가 사라져야 한다', async () => {
  render(
    <CartProvider>
      <ProductListPage />
      <ErrorBox backgroundColor='#FFC9C9' />
    </CartProvider>
  );

  await waitFor(() => {
    expect(screen.queryByRole('status', { name: '로딩 중' })).not.toBeInTheDocument();
  });
});

it('상품을 장바구니에 담으면 헤더에서 장바구니 숫자가 증가한다.', async () => {
  render(
    <CartProvider>
      <ProductListPage />
      <ErrorBox
        backgroundColor='
#FFC9C9'
      />
    </CartProvider>
  );

  const cartButton = await screen.findAllByText('담기');
  screen.debug(cartButton);
  fireEvent.click(cartButton[0]);
  fireEvent.click(cartButton[1]);

  const headerCount = await screen.findByTestId('cart-count');
  expect(headerCount).toHaveTextContent('2');
});
