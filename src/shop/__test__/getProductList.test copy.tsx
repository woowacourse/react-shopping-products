import { render, screen } from '@testing-library/react';
import App from '../../App';
import mockData from '../__mocks__/productListMockData.json';
import { getListData } from '../../api/getListData';
import { getShoppingCartData } from '../../api/getShoppingCartData';
import { postCartItem } from '../../api/postCartItem';
import { deleteCartItem } from '../../api/deleteCartItem';

jest.mock('../../api/postCartItem', () => ({
  postCartItem: jest.fn().mockImplementation(() => Promise.resolve(mockData)),
}));

jest.mock('../../api/getShoppingCartData', () => ({
  getShoppingCartData: jest
    .fn()
    .mockImplementation(() => Promise.resolve(mockData)),
}));

jest.mock('../../api/getShoppingCartData', () => ({
  getListData: jest.fn().mockImplementation(() => Promise.resolve(mockData)),
}));

jest.mock('../../api/deleteCartItem', () => ({
  deleteCartItem: jest.fn().mockImplementation(() => Promise.resolve(mockData)),
}));
describe('삼품 목록을 조회할 시', () => {
  it('서버에 상품 목록이 정상적으로 불러올 경우 20개의 상품 목록이 보여진다', async () => {
    render(<App />);

    const productList = await screen.findByTestId('product-list');

    console.log(productList);
  });
});
