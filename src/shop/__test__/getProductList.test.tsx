import { render, screen } from '@testing-library/react';
import App from '../../App';
import mockData from '../__mocks__/productListMockData.json';

jest.mock('../api/getShoppingCartData', () => ({
  getShoppingCartData: jest
    .fn()
    .mockImplementation(() => Promise.resolve(mockData)),
}));

describe('삼품 목록을 조회할 시', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('서버에 상품 목록이 정상적으로 불러올 경우 20개의 상품 목록이 보여진다', async () => {
    // fetch.mockResolvedValue({
    //   json: jest.fn().mockResolvedValue(mockData),
    // });

    render(<App />);

    const productList = await screen.findByTestId('product-list');

    console.log(productList);
  });
});
