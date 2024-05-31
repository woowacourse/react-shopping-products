import { act } from 'react';
import useCartItemHandler from '../src/hooks/useCartItemHandler';
import { renderHook, waitFor } from '@testing-library/react';
import { server } from '../src/mocks/server';
import { HttpResponse, http } from 'msw';
import { CART_ITEMS_ENDPOINT } from '../src/api/endpoints';
import { wrapper } from './utils/test-utils';

const renderUseCartItemHook = (initIsInCart) =>
  renderHook(() => useCartItemHandler({ productId: 10, initIsInCart }), {
    wrapper: wrapper,
  });

describe('useCartItemHandler', () => {
  describe('장바구니에 상품 추가 및 삭제', () => {
    it('담기 버튼을 누르면 장바구니에 상품이 담겨야한다.', async () => {
      const { result } = renderUseCartItemHook(false);

      expect(result.current.isInCart).toBe(false);

      await act(async () => {
        await result.current.handleAddCartItem();
      });

      await waitFor(() => {
        expect(result.current.isInCart).toBe(true);
      });
    });

    it('빼기 버튼을 누르면 장바구니에 상품이 삭제되어야한다.', async () => {
      const { result } = renderUseCartItemHook(true);

      expect(result.current.isInCart).toBe(true);

      await act(async () => {
        await result.current.handleRemoveCartItem();
      });

      await waitFor(() => {
        expect(result.current.isInCart).toBe(false);
      });
    });


    it('장바구니 목록을 가져오는데 실패했을 때, error 상태값이 true가 되야한다.', async () => {
      server.use(
        http.post(CART_ITEMS_ENDPOINT, () => {
          return new HttpResponse('Internal Server Error', { status: 500 });
        }),
      );

      const { result } = renderUseCartItemHook(false);

      await act(async () => {
        result.current.handleAddCartItem();
      });

      await waitFor(() => {
        expect(result.current.error).toBe(true);
      });
    });
  });

  it('장바구니 목록을 가져오는 중일 때, loading 상태값이 true가 되야한다.', async () => {
    const { result } = renderUseCartItemHook(false);

    expect(result.current.loading).toBe(false);

    act(() => {
      result.current.handleAddCartItem();
    });

    expect(result.current.loading).toBe(true);
  });
});
