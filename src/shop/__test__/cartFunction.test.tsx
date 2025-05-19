import { render, screen } from '@testing-library/react';
import { productListMockData } from '../__mocks__/productListMockData';
import { cartMockData } from '../__mocks__/cartData';
import App from '../../App';

jest.mock('../../components/features/product/api/getShoppingCartList', () => ({
  getShoppingCartList: jest
    .fn()
    .mockImplementation(() => Promise.resolve(cartMockData)),
}));

jest.mock('../../components/features/product/api/getProductList', () => ({
  getProductList: jest
    .fn()
    .mockImplementation(() => Promise.resolve(productListMockData)),
}));

jest.mock('../../api/baseAPI', () => ({
  baseAPI: jest
    .fn()
    .mockImplementation(() => Promise.resolve(productListMockData)),
}));

describe('SHOP 페이지에 접속 시', () => {
  it('장바구니 아이콘에 현재 장바구니 아이템 수가 표시된다', async () => {
    render(<App />);

    const cartButton = await screen.findByTestId('cart-button');
    expect(cartButton.textContent).toBe('2');
  });
});
