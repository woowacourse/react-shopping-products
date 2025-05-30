import { fireEvent, render, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { handlers } from '../mocks/handler';
import { ErrorContextProvider } from '../contexts/ErrorContext';
import { ApiProvider } from '../contexts/ApiContext';
import HomeHeader from '../components/Header/HomeHeader';
import { CartItemResponse, ProductResponse } from '../types/response';
import { URLS } from '../constants/url';
import ProductList from '../components/Product/ProductList/ProductList';
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('상품 리스트를 조회할 수 있다.', async () => {
  render(
    <ErrorContextProvider>
      <ApiProvider>
        <ProductList />
      </ApiProvider>
    </ErrorContextProvider>
  );

  // given : 상품 목록을 받았을 때
  const res = await fetch(URLS.PRODUCTS);
  const data: ProductResponse = await res.json();
  const expectedLength = data.content.length;

  // when : 유저가 화면에 들어왔을 때
  const productItem = await screen.findAllByRole('listitem');

  // then : 상품 목록이 화면에 보여야 한다.
  expect(productItem).toHaveLength(expectedLength);
});

it('상품을 장바구니에 담으면 헤더에서 장바구니 숫자가 증가한다.', async () => {
  render(
    <ErrorContextProvider>
      <ApiProvider>
        <HomeHeader />
        <ProductList />
      </ApiProvider>
    </ErrorContextProvider>
  );

  // given : 상품이 존재한다.
  const res = await fetch(URLS.CART_ITEMS);
  const data: CartItemResponse = await res.json();
  const expectedLength = data.content.length;

  // when : 장바구니에 상품을 담았을 때
  const cartButton = await screen.findAllByText('담기');
  screen.debug(cartButton);
  fireEvent.click(cartButton[0]);

  // then : 장바구니 숫자가 증가한다.
  const headerCount = await screen.findByText(expectedLength + 1);
  expect(headerCount).toBeInTheDocument();
});
