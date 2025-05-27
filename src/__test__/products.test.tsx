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

describe('리바이 아커만의 ProductCard에서 + 버튼을 누르면 추가가 되고 재고가 없으면 버튼이 disabled 된다.', () => {
  it('adds "리바이 아커만" to cart and increases quantity via + button', async () => {
    const user = userEvent.setup();
    renderApp();

    const productName = await screen.findByText('리바이 아커만');
    expect(productName).toBeInTheDocument();

    const productCard = productName.closest('[data-testid="product-card"]') as HTMLElement;
    expect(productCard).not.toBeNull();

    const addButton = within(productCard).getByRole('button');
    await user.click(addButton);

    const plusButton = await within(productCard).findByText('+');
    expect(plusButton).toBeInTheDocument();

    await user.click(plusButton);

    await waitFor(() => {
      expect(within(productCard).getByText('2')).toBeInTheDocument();
      expect(plusButton).toBeDisabled();
    });
  });
});
