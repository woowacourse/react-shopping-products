import App from '@/App';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { cartMockData } from '../__mocks__/cartData';
import { productListMockData } from '../__mocks__/productListMockData';

let currentCart = [...cartMockData];

jest.mock('@/components/features/product/api/getShoppingCartList', () => ({
  getShoppingCartList: jest.fn(() => Promise.resolve(currentCart)),
}));

jest.mock('@/components/features/product/api/addCartItem', () => ({
  addCartItem: jest.fn((productId: string) => {
    const foundProduct = productListMockData.find((p) => p.id === productId);
    if (!foundProduct) {
      throw new Error(`${productId} id를 가진 Product가 존재하지 않습니다.`);
    }
    currentCart.push({
      id: String(currentCart.length + 1),
      quantity: 1,
      product: foundProduct,
    });
    return Promise.resolve();
  }),
}));

jest.mock('@/components/features/product/api/deleteCartItem', () => ({
  deleteCartItem: jest.fn((cartId: string) => {
    currentCart = currentCart.filter((item) => item.id.toString() !== cartId);
    return Promise.resolve();
  }),
}));

jest.mock('@/components/features/product/api/getProductList', () => ({
  getProductList: jest.fn(() => Promise.resolve(productListMockData)),
}));

jest.mock('@/api/baseAPI', () => ({
  baseAPI: jest.fn(() => Promise.resolve(productListMockData)),
}));

describe('SHOP 페이지에 접속 시', () => {
  afterEach(() => {
    currentCart = [...cartMockData]; // 테스트 간 상태 초기화
    jest.clearAllMocks();
  });

  it('장바구니 아이콘에 현재 장바구니 아이템 수가 표시된다', async () => {
    render(<App />);

    const cartButton = await screen.findByTestId('cart-button');
    expect(cartButton.textContent).toBe('2');
  });

  it('담기 버튼 클릭 시 장바구니 아이콘 숫자가 +1 증가한다', async () => {
    render(<App />);

    const cartButton = await screen.findByTestId('cart-button');
    expect(cartButton.textContent).toBe('2');

    // 장바구니에 id 26인 상품이 담겨있지 않음
    const firstProductCard = await screen.findByTestId('product-26');
    const addButton = within(firstProductCard).getByRole('button');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByTestId('cart-button').textContent).toBe('3');
    });
  });

  it('빼기 버튼 클릭 시 장바구니 아이콘 숫자가 -1 감소한다', async () => {
    render(<App />);

    const cartButton = await screen.findByTestId('cart-button');
    expect(cartButton.textContent).toBe('2');

    // 장바구니에 id 42인 상품이 담겨있음
    const secondProductCard = await screen.findByTestId('product-42');
    const deleteButton = within(secondProductCard).getByRole('button');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.getByTestId('cart-button').textContent).toBe('1');
    });
  });
});
