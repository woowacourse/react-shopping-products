import { render, screen } from '@testing-library/react';
import App from '../../App';
import { productListMockData } from '../__mocks__/productListMockData';
import { cartMockData } from '../__mocks__/cartData';

jest.mock('../../api/postCartItem', () => ({
  postCartItem: jest
    .fn()
    .mockImplementation(() => Promise.resolve(cartMockData)),
}));

jest.mock('../../api/getShoppingCartData', () => ({
  getShoppingCartData: jest
    .fn()
    .mockImplementation(() => Promise.resolve(cartMockData)),
}));

jest.mock('../../api/getListData', () => ({
  getListData: jest.fn().mockImplementation(() => {
    console.log(productListMockData);
    return Promise.resolve(productListMockData);
  }),
}));

jest.mock('../../api/deleteCartItem', () => ({
  deleteCartItem: jest
    .fn()
    .mockImplementation(() => Promise.resolve(cartMockData)),
}));

jest.mock('../../api/baseAPI', () => ({
  baseAPI: jest.fn().mockImplementation(() => Promise.resolve(cartMockData)),
}));

describe('SHOP 페이지에 접속 시', () => {
  it('장바구니 아이콘에 현재 장바구니 아이템 수가 표시된다', async () => {
    render(<App />);

    const cartButton = await screen.findByTestId('cart-button');
    expect(cartButton.textContent).toBe('2');
  });
});
