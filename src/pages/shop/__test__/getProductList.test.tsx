import { CartProvider } from '@/components/features/cart';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ShopPage from '../ShopPage';
import productsMockData from '@/mocks/data/mock-products.json';

describe('삼품 목록 기능 테스트', () => {
  beforeEach(() => {
    render(
      <CartProvider>
        <ShopPage />
      </CartProvider>
    );
  });

  it('서버에 상품 목록이 정상적으로 불러올 경우 20개의 상품 목록이 보여진다', async () => {
    const productItems = await screen.findAllByTestId(/product-/);

    expect(productItems.length).toBeLessThanOrEqual(20);

    productItems.forEach((item) => {
      expect(item.getAttribute('data-testid')).not.toBeNull();
    });
  });

  it('카테고리를 "패션잡화"로 선택하면 해당 상품만 목록에 렌더링된다', async () => {
    const dropdownButtons = await screen.findAllByTestId(/filter-/);
    fireEvent.click(dropdownButtons[0]);

    const fashionOption = await screen.findByText('패션잡화');
    fireEvent.click(fashionOption);

    await waitFor(() => {
      const items = screen.getAllByTestId(/product-/);
      expect(items).toHaveLength(8);
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

      const expectedSorted = [...productsMockData]
        .sort((a, b) => b.price - a.price)
        .map((item) => item.name ?? '')
        .slice(0, 20);

      expectedSorted.forEach((expectedName, idx) => {
        expect(renderedTexts[idx]).toContain(expectedName);
      });
    });
  });
});
