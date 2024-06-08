import { useCart } from '../src/context/CartContext';
import { renderHook, waitFor } from '@testing-library/react';
import { wrapper } from './utils/test-utils';
import { server } from '../src/mocks/server';
import { HttpResponse, http } from 'msw';
import ENDPOINT from '../src/api/endpoints';

const renderUseCartHook = () =>
  renderHook(() => useCart(), {
    wrapper: wrapper,
  });
describe('ShoppingCartContext', () => {
  it('장바구니에 담겨있는 아이템들은 가져와야한다.', async () => {
    const { result } = renderUseCartHook();

    expect(result.current.isFetching).toBe(true);

    await waitFor(() => {
      expect(result.current.isFetching).toBe(false);
      expect(result.current.cartItem).toHaveLength(2);
    });
  });

  it('장바구니 조회 중 fetching 상태', () => {
    const { result } = renderUseCartHook();

    expect(result.current.isFetching).toBe(true);
  });

  it('장바구니 목록을 가져오는데 실패했을 때, isError 상태값이 true가 되야한다.', async () => {
    server.use(
      http.get(`${ENDPOINT.CART_ITEMS}`, () => {
        return new HttpResponse('error', { status: 500 });
      }),
    );

    const { result } = renderUseCartHook();

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
  });
});
