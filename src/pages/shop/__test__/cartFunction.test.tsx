import App from '@/App';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { cartMockData } from '../__mocks__/cartData';
import { productListMockData } from '../__mocks__/productListMockData';

let currentCart = [...cartMockData];

jest.mock('@/components/features/product/api', () => ({
  getProductList: jest.fn(() => Promise.resolve(productListMockData)),
}));

jest.mock('@/components/features/cart/api', () => ({
  getShoppingCartList: jest.fn(() => Promise.resolve(currentCart)),
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
  deleteCartItem: jest.fn((cartId: string) => {
    currentCart = currentCart.filter((item) => item.id.toString() !== cartId);
    return Promise.resolve();
  }),
  updateCartItem: jest.fn((id: string, quantity: number) => {
    const cartItem = currentCart.find((item) => item.id === id);
    if (!cartItem) {
      throw new Error(`${id} id를 가진 Cart가 존재하지 않습니다.`);
    }
    const maxQuantity = cartItem.product.quantity;
    if (quantity < 1 || quantity > maxQuantity) {
      throw new Error(`재고와 수량이 맞지 않습니다. 현재 재고: ${maxQuantity}`);
    }
    cartItem.quantity = quantity;
    return Promise.resolve();
  }),
}));

jest.mock('@/api/baseAPI', () => ({
  baseAPI: jest.fn(() => Promise.resolve(productListMockData)),
}));

describe('SHOP 페이지에 접속 시', () => {
  beforeEach(() => {
    currentCart = [...cartMockData];
    render(<App />);
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('장바구니 아이콘에 현재 장바구니 아이템 수가 표시된다', async () => {
    const cartButton = await screen.findByTestId('cart-button');
    expect(cartButton.textContent).toBe('1');
  });

  it('담기 버튼 클릭 시 장바구니 아이콘 숫자가 +1 증가한다', async () => {
    const cartButton = await screen.findByTestId('cart-button');
    expect(cartButton.textContent).toBe('1');

    // 장바구니에 id 26인 상품이 담겨있지 않음
    const firstProductCard = await screen.findByTestId('product-42');
    const addButton = within(firstProductCard).getByRole('button');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByTestId('cart-button').textContent).toBe('2');
    });
  });

  it('+ 버튼 클릭 시 currentCart의 해당 cart 항목의 수량이 1 증가한다', async () => {
    const targetCartId = '1';

    const originalQuantity = currentCart.find(
      (c) => c.id === targetCartId
    )?.quantity;
    expect(originalQuantity).toBeDefined();

    const targetProductCard = await screen.findByTestId('product-34');

    const plusButton = within(targetProductCard).getAllByRole('button')[1];

    fireEvent.click(plusButton);

    await waitFor(() => {
      const updatedQuantity = currentCart.find(
        (c) => c.id === targetCartId
      )?.quantity;
      expect(updatedQuantity).toBe(originalQuantity! + 1);
    });
  });

  it('장바구니에 담겨있는 상품에서 "-" 버튼 클릭 시 장바구니 아이콘 숫자가 -1 감소한다', async () => {
    const firstProductCard = await screen.findByTestId('product-34');
    const buttons = await within(firstProductCard).findAllByRole('button');
    fireEvent.click(buttons[0]); // 빼기 버튼 클릭

    const cartButton = await screen.findByTestId('cart-button');

    await waitFor(() => {
      expect(cartButton.textContent).toBe('1');
    });
  });

  it('개수가 0개인 상품 카드에는 "품절" 오버레이 문구가 표시된다', async () => {
    const soldOutProductCard = await screen.findByTestId('product-26');

    const soldOutText = within(soldOutProductCard).getByText('품절');

    expect(soldOutText).toBeTruthy();
  });
});
