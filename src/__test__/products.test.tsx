import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { ProductsWithCartProvider } from '../shared/contexts/productsWithCart/ProductsWithCartProvider';
import App from '../App';
import '../setupTests';

function renderApp() {
  return render(
    <ProductsWithCartProvider>
      <App />
    </ProductsWithCartProvider>
  );
}

describe('GET API 요청 후 ProductList들이 잘 보이는지 테스트한다.', () => {
  it('API 요청으로부터 스켈리톤이 보이고 이후 20개의 ProductCard가 보인다.', async () => {
    renderApp();

    // 로딩 스켈레톤 확인
    const skeletons = screen.getAllByTestId('product-skeleton');
    expect(skeletons.length).toBe(20);

    // 제품명 확인
    await waitFor(() => {
      expect(screen.getByText('에어포스')).toBeInTheDocument();
      expect(screen.getByText('에어포스2')).toBeInTheDocument();
      expect(screen.getByText('달 무드등')).toBeInTheDocument();
    });

    // 전체 제품 개수 확인
    const allHeadings = screen.getAllByRole('heading', { level: 2 });
    expect(allHeadings.length).toBe(20);
  }),
    it('product 카테고리에 따라 필터링된 ProductList가 보인다.', async () => {
      const user = userEvent.setup();
      renderApp();

      const select = await screen.findByTestId('category-select');
      await user.selectOptions(select, '식료품');

      await waitFor(() => {
        const filteredCards = screen.getAllByTestId('product-card');
        expect(filteredCards.length).toBe(8);

        filteredCards.forEach((card) => {
          expect(card.textContent).toContain('식료품');
        });
      });
    }),
    it('정렬 select에서 낮은 가격순을 클릭하면 오름차순으로 정렬된 ProductList가 보인다.', async () => {
      const user = userEvent.setup();
      renderApp();
      const select = screen.getByTestId('sort-select');
      await user.selectOptions(select, '낮은 가격순');
      await waitFor(() => {
        const productList = screen.getByTestId('product-list');
        expect(productList.children.length).toBeGreaterThan(0);

        const productCards = screen.getAllByTestId('product-card');

        const extractPrice = (card: HTMLElement) => {
          const priceText = card.querySelector('[data-testid="product-price"]')?.textContent || '';
          const numeric = priceText.replace(/[^0-9]/g, '');
          return Number(numeric);
        };

        const prices = productCards.map(extractPrice);

        for (let i = 1; i < prices.length; i++) {
          expect(prices[i]).toBeGreaterThanOrEqual(prices[i - 1]);
        }
      });
    });
});

describe('ProductCard에서 + 버튼을 누르면 추가가 되고 재고가 없으면 버튼이 disabled 된다.', () => {
  it('수량이 2인 ProductCard를 찾아 + 버튼 클릭하면 재고와 수량이 같아지고 버튼이 disabled 상태됨을 검증한다.', async () => {
    const user = userEvent.setup();
    renderApp();

    const quantityElements = await screen.findAllByTestId('product-quantity');

    expect(quantityElements.length).toBeGreaterThan(0);

    const targetQuantityElement = quantityElements.find((quantityElement) => {
      const quantityText = quantityElement.textContent || '';
      const quantityNumber = Number(quantityText.replace(/[^0-9]/g, ''));

      return Number(quantityNumber) === 2;
    });

    expect(targetQuantityElement).toBeDefined();
    if (!targetQuantityElement) return;

    const targetCard = targetQuantityElement.closest('[data-testid="product-card"]') as HTMLElement;
    expect(targetCard).not.toBeNull();
    if (!targetCard) return;

    const cartButton = await within(targetCard).findByTestId('custom-button');
    expect(cartButton).toBeInTheDocument();
    await user.click(cartButton);

    const plusButton = within(targetCard).getByText('+');
    expect(plusButton).toBeInTheDocument();
    await user.click(plusButton);

    await waitFor(() => {
      expect(plusButton).toBeDisabled();
    });
  });
});
