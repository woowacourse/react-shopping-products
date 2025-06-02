import { render, screen, waitFor } from '@testing-library/react';
import ProductListContainer from '../src/Component/Product/ProductListContainer';
import { vi, vitest } from 'vitest';
import userEvent from '@testing-library/user-event';
import Provider from '../src/Component/Common/Provider';
import { resetCartState } from '../src/mock/handlers';
import { server } from '../src/mock/server';
import productData from '../src/mock/products.json';

const mockUpdateErrorMessage = vitest.fn();

describe('ProductListContainer', () => {
  beforeEach(() => {
    resetCartState();
    server.resetHandlers();
    vi.resetAllMocks();
  });

  it('상품 목록을 성공적으로 렌더링한다', async () => {
    render(
      <Provider>
        <ProductListContainer updateErrorMessage={mockUpdateErrorMessage} />
      </Provider>
    );

    await waitFor(() => {
      productData.content.forEach((product) => {
        expect(screen.getByText(product.name)).toBeInTheDocument();
      });
    });
  });

  it('카테고리 식료품을 선택하면 식료품만 나타난다.', async () => {
    render(
      <Provider>
        <ProductListContainer updateErrorMessage={mockUpdateErrorMessage} />
      </Provider>
    );

    const selectElement = screen.getByRole('combobox', { name: '카테고리' });
    const option = screen.getByRole('option', { name: '식료품' });

    await userEvent.selectOptions(selectElement, option);

    const filtered = productData.content.filter(
      (item) => item.category === '식료품'
    );

    await waitFor(() => {
      filtered.forEach((product) => {
        expect(screen.getByText(product.name)).toBeInTheDocument();
      });
    });
  });

  it('카테고리 패션잡화를 선택하면 패션잡화만 나타난다.', async () => {
    render(
      <Provider>
        <ProductListContainer updateErrorMessage={mockUpdateErrorMessage} />
      </Provider>
    );

    const selectElement = screen.getByRole('combobox', { name: '카테고리' });
    const option = screen.getByRole('option', { name: '패션잡화' });

    await userEvent.selectOptions(selectElement, option);

    const filtered = productData.content.filter(
      (item) => item.category === '패션잡화'
    );

    await waitFor(() => {
      filtered.forEach((product) => {
        expect(screen.getByText(product.name)).toBeInTheDocument();
      });
    });
  });
});
