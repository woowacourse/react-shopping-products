import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import App from '../../App';
import { cartMockData } from '../__mocks__/cartData';
import { productListMockData } from '../__mocks__/productListMockData';

let currentCart = [...cartMockData];

jest.mock('../../api/cart', () => ({
  getShoppingCartData: jest.fn(() => Promise.resolve(currentCart)),
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
  patchCartItem: jest.fn((cartId: string, quantity: number) => {
    const cartItem = currentCart.find((item) => item.id === cartId);
    if (!cartItem) {
      throw new Error(`${cartId} id를 가진 Cart가 존재하지 않습니다.`);
    }
    const maxQuantity = cartItem.product.quantity;
    if (quantity < 1 || quantity > maxQuantity) {
      throw new Error(`재고와 수량이 맞지 않습니다. 현재 재고: ${maxQuantity}`);
    }
    cartItem.quantity = quantity;
    return Promise.resolve();
  }),
}));

jest.mock('../../api/products', () => ({
  getProductsData: jest.fn(() => Promise.resolve(productListMockData)),
}));

jest.mock('../../api/baseAPI', () => ({
  baseAPI: jest.fn(() => Promise.resolve(productListMockData)),
}));

describe('SHOP 페이지에 접속 시', () => {
  beforeEach(() => {});
  afterEach(() => {
    currentCart = JSON.parse(JSON.stringify(cartMockData));
    jest.clearAllMocks();
  });

  it('장바구니 모달 E2E 테스트 - Product List에서 추가한 상품 수량만큼 장바구니가 업데이트되고, 모달에서도 수량을 조절 가능하며 총 결제 금액이 표시된다', async () => {
    render(<App />);

    const productList = await screen.findAllByRole('listitem');
    const productAddButton = await within(productList[1]).findByLabelText(
      '수량 증가'
    );
    fireEvent.click(productAddButton);

    const cartButton = await screen.findAllByRole('cart-button');
    fireEvent.click(cartButton[0]);

    const cartProductInfos = await screen.findAllByRole('cart-product-info');
    await waitFor(() => {
      expect(cartProductInfos.length).toBe(2);
    });

    const quantityText = await within(cartProductInfos[0]).findByLabelText(
      '수량'
    );
    expect(quantityText.textContent).toBe('2');

    const addQuantityButton = await within(cartProductInfos[0]).findByLabelText(
      '수량 증가'
    );
    fireEvent.click(addQuantityButton);
    await waitFor(() => {
      expect(quantityText.textContent).toBe('3');
    });

    const totalPriceText = await screen.findByLabelText(/^총 결제 금액은/);
    expect(totalPriceText.textContent).toBe('5,130원');
  });
});
