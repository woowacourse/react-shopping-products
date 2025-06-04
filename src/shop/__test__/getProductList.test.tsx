import App from '../../App';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { cartMockData } from '../__mocks__/cartData';
import { productListMockData } from '../__mocks__/productListMockData';

jest.mock('../../api/cart', () => ({
  getShoppingCartData: jest
    .fn()
    .mockImplementation(() => Promise.resolve(cartMockData)),
}));

jest.mock('../../api/products', () => ({
  getProductsData: jest.fn((filterOption) => {
    const { category, sort } = filterOption;

    let filtered = [...productListMockData];

    if (category.value !== '전체') {
      filtered = filtered.filter((item) => item.category === category.value);
    }

    if (sort.value === 'asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort.value === 'desc') {
      filtered.sort((a, b) => b.price - a.price);
    }

    return Promise.resolve(filtered);
  }),
}));

jest.mock('../../api/baseAPI', () => ({
  baseAPI: jest
    .fn()
    .mockImplementation(() => Promise.resolve(productListMockData)),
}));

describe('상품 목록을 조회할 시', () => {
  beforeEach(() => {
    render(<App />);
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('서버에 상품 목록이 정상적으로 불러올 경우 20개의 상품 목록이 보여진다', async () => {
    const productList = await screen.findAllByRole('list');

    expect(productList.length).toBeLessThanOrEqual(20);

    productList.forEach((item) => {
      expect(item.getAttribute('id')).not.toBeNull();
    });
  });

  it('카테고리를 "패션잡화"로 선택하면 해당 상품만 목록에 렌더링된다', async () => {
    const categoryButton = await screen.findByLabelText('카테고리 선택');
    fireEvent.click(categoryButton);

    const fashionOption = await screen.findByText('패션잡화');
    fireEvent.click(fashionOption);

    await waitFor(async () => {
      const items = await screen.findAllByRole('list');
      expect(items).toHaveLength(1);
    });
  });

  it('정렬을 "높은 가격순"으로 선택하면 가장 비싼 상품이 먼저 렌더링된다', async () => {
    const sortButton = await screen.findByLabelText('정렬 방식 선택');
    fireEvent.click(sortButton);

    const descOption = await screen.findByText('높은 가격순');
    fireEvent.click(descOption);

    const productList = await screen.findAllByRole('listitem');

    await waitFor(async () => {
      const renderedTexts = productList.map((item) => item.textContent ?? '');
      const expectedSorted = [...productListMockData]
        .sort((a, b) => b.price - a.price)
        .map((item) => item.name ?? '');

      expectedSorted.forEach((expectedName, idx) => {
        expect(renderedTexts[idx]).toContain(expectedName);
      });
    });
  });
});
