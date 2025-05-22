import { render, waitFor, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { useProducts } from '../hooks/useProducts';
import * as api from '../api/products';
import { ERROR_MESSAGES } from '../constants/errorMessages';

const mockShowToast = vi.fn();

vi.mock('../api/products');
const mockedGetProducts = vi.mocked(api.getProducts);

vi.mock('../context/ToastContext', () => ({
  useToast: () => ({ showToast: mockShowToast }),
}));

function TestComponent({sortType, category}: {
  sortType: string;
  category?: string;
}) {
  const { products, isLoading, isError } = useProducts(sortType, category!);

  return (
    <div>
      <span data-testid="loading">{String(isLoading)}</span>
      <span data-testid="error">{String(isError)}</span>
      <span data-testid="products">
        {JSON.stringify(products)}
      </span>
    </div>
  );
}

describe('useProducts 훅', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('정상적으로 상품을 가져오면 상태값이 업데이트된다', async () => {
    const fakeData = { content: [{ id: 1, name: '테스트 상품' }] };
    mockedGetProducts.mockResolvedValueOnce(fakeData);

    render(
      <TestComponent sortType="asc" category="electronics" />
    );

    await waitFor(() =>
      expect(screen.getByTestId('loading').textContent).toBe('false')
    );

    expect(screen.getByTestId('products').textContent).toContain(
      '테스트 상품'
    );
    expect(screen.getByTestId('error').textContent).toBe('false');
    expect(mockShowToast).not.toHaveBeenCalled();
  });

  it('상품 가져오기 실패 시 에러 상태가 true가 되고 토스트를 띄운다', async () => {
    mockedGetProducts.mockRejectedValueOnce(new Error('fail'));

    render(
      <TestComponent sortType="desc" category="apparel" />
    );

    await waitFor(() =>
      expect(screen.getByTestId('loading').textContent).toBe('false')
    );

    expect(screen.getByTestId('error').textContent).toBe('true');
    expect(mockShowToast).toHaveBeenCalledWith(
      ERROR_MESSAGES.productsFetchError
    );
  });
});
