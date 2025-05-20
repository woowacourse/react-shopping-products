import App from '@/App';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { cartMockData } from '../__mocks__/cartData';
import { productListMockData } from '../__mocks__/productListMockData';

jest.mock('../../components/features/product/api/getShoppingCartList', () => ({
  getShoppingCartList: jest
    .fn()
    .mockImplementation(() => Promise.resolve(cartMockData)),
}));

jest.mock('../../components/features/product/api/getProductList', () => ({
  getProductList: jest.fn((filterOption) => {
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

describe('삼품 목록 기능 테스트', () => {
  beforeEach(() => {
    render(<App />);
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('서버에 상품 목록이 정상적으로 불러올 경우 20개의 상품 목록이 보여진다', async () => {
    const productItems = await screen.findAllByTestId(/product-/);

    expect(productItems.length).toBeLessThanOrEqual(20);

    productItems.forEach((item) => {
      expect(item.getAttribute('data-testid')).not.toBeNull();
    });
  });

  it('카테고리를 "패션잡화"로 선택하면 해당 상품만 목록에 렌더링된다', async () => {
    console.log("옵션 중 '패션잡화' 클릭 전");

    const dropdownButtons = await screen.findAllByTestId(/filter-/);
    fireEvent.click(dropdownButtons[0]);

    const fashionOption = await screen.findByText('패션잡화');
    fireEvent.click(fashionOption);

    console.log("옵션 중 '패션잡화' 클릭 후");

    await waitFor(() => {
      const items = screen.getAllByTestId(/product-/);
      expect(items).toHaveLength(1);
    });
  });

  it('정렬을 "높은 가격순"으로 선택하면 가장 비싼 상품이 먼저 렌더링된다', async () => {
    const dropdownButtons = await screen.findAllByTestId(/filter-/);
    fireEvent.click(dropdownButtons[1]);

    const descOption = await screen.findByText('높은 가격순');
    fireEvent.click(descOption);

    await waitFor(async () => {
      const items = await screen.findAllByTestId(/product-/);
      const renderedTexts = items.map((item) => item.textContent ?? '');

      const expectedSorted = [...productListMockData]
        .sort((a, b) => b.price - a.price)
        .map((item) => item.name ?? '');

      expectedSorted.forEach((expectedName, idx) => {
        console.log(expectedName, renderedTexts);
        expect(renderedTexts[idx]).toContain(expectedName);
      });
    });
  });
});
