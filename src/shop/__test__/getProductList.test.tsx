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
  baseAPI: jest.fn().mockImplementation(() => Promise.resolve(mockData)),
}));

describe('삼품 목록을 조회할 시', () => {
  it('서버에 상품 목록이 정상적으로 불러올 경우 20개의 상품 목록이 보여진다', async () => {
    render(<App />);

    const productList = await screen.findByTestId('26');
    console.log(productList);
  });
});
