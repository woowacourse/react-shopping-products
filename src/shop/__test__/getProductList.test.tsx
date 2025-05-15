import { render, screen } from '@testing-library/react';
import App from '../../App';
import { cartMockData } from '../__mocks__/cartData';
import { productListMockData } from '../__mocks__/productListMockData';

jest.mock('../../api/getShoppingCartData', () => ({
  getShoppingCartData: jest
    .fn()
    .mockImplementation(() => Promise.resolve(cartMockData)),
}));

jest.mock('../../api/getListData', () => ({
  getListData: jest
    .fn()
    .mockImplementation(() => Promise.resolve(productListMockData)),
}));

jest.mock('../../api/baseAPI', () => ({
  baseAPI: jest
    .fn()
    .mockImplementation(() => Promise.resolve(productListMockData)),
}));

describe('삼품 목록을 조회할 시', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('서버에 상품 목록이 정상적으로 불러올 경우 20개의 상품 목록이 보여진다', async () => {
    render(<App />);

    const productList = await screen.findByTestId('product-list');
    const productItems = Array.from(productList.children);

    expect(productItems.length).toBeLessThanOrEqual(20);

    productItems.forEach((item) => {
      expect(item.getAttribute('data-testid')).not.toBeNull();
    });
  });
});
