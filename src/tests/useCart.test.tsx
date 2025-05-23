import { render, waitFor, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { useCart } from '../hooks/useCart';
import * as api from '../api/cart';

vi.mock('../api/cart');
const mockedGetCartItem = vi.mocked(api.getCartItem);

function TestComponent() {
  const {
    cart,
    isLoading,
    isError,
    fetchCart,
    isInCart,
    getCartItemId,
  } = useCart();

  return (
    <div>
      <span data-testid="loading">{String(isLoading)}</span>
      <span data-testid="error">{String(isError)}</span>
    <span data-testid="cart">{cart ? JSON.stringify(cart) : ''}</span>
    <span data-testid="inCart1">{String(isInCart(1))}</span>
  <span data-testid="inCart3">{String(isInCart(3))}</span>
  <span data-testid="cartItemId1">{String(getCartItemId(1))}</span>
  <span data-testid="cartItemId3">{String(getCartItemId(3))}</span>
  <button onClick={() => fetchCart()} data-testid="refetch">
    refetch
    </button>
    </div>
);
}

describe('useCart 훅', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('정상적으로 장바구니 데이터를 가져오면 상태가 업데이트된다', async () => {
    // getCartItem 성공 응답 목(mock)
    const fakeData = {
      content: [
        { id: 100, product: { id: 1, name: '첫번째 상품' } },
        { id: 200, product: { id: 2, name: '두번째 상품' } },
      ],
    };
    mockedGetCartItem.mockResolvedValueOnce(fakeData);

    render(<TestComponent />);

    await waitFor(() =>
      expect(screen.getByTestId('cart').textContent).toContain('"id":100')
    );

    expect(screen.getByTestId('loading').textContent).toBe('false');
    expect(screen.getByTestId('error').textContent).toBe('false');

    expect(screen.getByTestId('inCart1').textContent).toBe('true');
    expect(screen.getByTestId('inCart3').textContent).toBe('false');
    expect(screen.getByTestId('cartItemId1').textContent).toBe('100');
    expect(screen.getByTestId('cartItemId3').textContent).toBe('null');
  });

  it('장바구니 조회 실패 시 isError가 true가 된다', async () => {
    mockedGetCartItem.mockRejectedValueOnce(new Error('network error'));

    render(<TestComponent />);

    await waitFor(() =>
      expect(screen.getByTestId('loading').textContent).toBe('false')
    );

    expect(screen.getByTestId('error').textContent).toBe('true');

    expect(screen.getByTestId('cart').textContent).toBe('');
    expect(screen.getByTestId('inCart1').textContent).toBe('false');
    expect(screen.getByTestId('cartItemId1').textContent).toBe('null');
  });

  it('fetchCart를 수동으로 재호출할 수 있다', async () => {
    mockedGetCartItem.mockRejectedValueOnce(new Error('fail'));
    const fakeData = { content: [{ id: 300, product: { id: 3 } }] };
    mockedGetCartItem.mockResolvedValueOnce(fakeData);

    render(<TestComponent />);

    await waitFor(() =>
      expect(screen.getByTestId('error').textContent).toBe('true')
    );

    screen.getByTestId('refetch').click();

    await waitFor(() =>
      expect(screen.getByTestId('cart').textContent).toContain('"id":300')
    );
    expect(screen.getByTestId('error').textContent).toBe('false');
  });
});
