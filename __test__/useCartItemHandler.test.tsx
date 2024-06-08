import { act } from 'react';
import useCartItemHandler from '../src/hooks/useCartItemHandler';
import { renderHook, waitFor } from '@testing-library/react';
import { server } from '../src/mocks/server';
import { HttpResponse, http } from 'msw';
import ENDPOINT from '../src/api/endpoints';
import { wrapper } from './utils/test-utils';

const renderUseCartItemHook = () =>
  renderHook(() => useCartItemHandler({ productId: 10 }), {
    wrapper: wrapper,
  });

describe('useCartItemHandler', () => {
  describe('장바구니에 상품 추가 및 삭제', () => {
    it('담기 버튼을 누르면 장바구니에 상품이 담겨야한다.', async () => {
      const { result } = renderUseCartItemHook();

      expect(result.current.isInCart).toBe(false);

      await act(async () => {
        await result.current.showCountButton();
      });

      await waitFor(() => {
        expect(result.current.isInCart).toBe(true);
      });
    });

    it('삭제 버튼을 누르면 장바구니에 상품이 삭제되어야한다.', async () => {
      const { result } = renderUseCartItemHook();

      expect(result.current.isInCart).toBe(false);
      server.use(
        http.get(`${ENDPOINT.CART_ITEMS}`, () => {
          return HttpResponse.json({
            content: [
              { id: 10, product: { id: 12 } },
              { id: 12, product: { id: 14 } },
              { id: 16, product: { id: 10 } },
            ],
          });
        }),
      );

      await act(async () => {
        await result.current.showCountButton();
      });

      await waitFor(() => {
        expect(result.current.isInCart).toBe(true);
      });

      server.use(
        http.get(`${ENDPOINT.CART_ITEMS}`, () => {
          return HttpResponse.json({
            content: [
              { id: 10, product: { id: 12 } },
              { id: 12, product: { id: 14 } },
            ],
          });
        }),
      );

      server.use(
        http.delete(`${ENDPOINT.CART_ITEMS}/16`, () => {
          return new HttpResponse(null, { status: 200 });
        }),
      );

      await act(async () => {
        await result.current.handleDeleteCartItem();
      });

      await waitFor(() => {
        expect(result.current.isInCart).toBe(false);
      });
    });

    it('+ 버튼을 누르면 해당 상품 수량이 증가한다.', async () => {
      const { result } = renderUseCartItemHook();

      expect(result.current.isInCart).toBe(false);
      server.use(
        http.get(`${ENDPOINT.CART_ITEMS}`, () => {
          return HttpResponse.json({
            content: [
              { id: 10, product: { id: 12 } },
              { id: 12, product: { id: 14 } },
              { id: 16, product: { id: 10 }, quantity: 1 },
            ],
          });
        }),
      );

      await act(async () => {
        await result.current.showCountButton();
      });

      await waitFor(() => {
        expect(result.current.isInCart).toBe(true);
        expect(result.current.itemQuantity).toBe(1);
      });

      server.use(
        http.get(`${ENDPOINT.CART_ITEMS}`, () => {
          return HttpResponse.json({
            content: [
              { id: 10, product: { id: 12 }, quantity: 2 },
              { id: 12, product: { id: 14 }, quantity: 2 },
              { id: 16, product: { id: 10 }, quantity: 2 },
            ],
          });
        }),
      );
      server.use(
        http.patch(`${ENDPOINT.CART_ITEMS}/16`, () => {
          return HttpResponse.json({});
        }),
      );

      await act(async () => {
        await result.current.handleAddCartItemQuantity();
      });

      await waitFor(() => {
        expect(result.current.isInCart).toBe(true);
        expect(result.current.itemQuantity).toBe(2);
      });
    });

    it('- 버튼을 누르면 해당 상품 수량이 감소한다.', async () => {
      const { result } = renderUseCartItemHook();

      expect(result.current.isInCart).toBe(false);
      server.use(
        http.get(`${ENDPOINT.CART_ITEMS}`, () => {
          return HttpResponse.json({
            content: [
              { id: 10, product: { id: 12 } },
              { id: 12, product: { id: 14 } },
              { id: 16, product: { id: 10 }, quantity: 2 },
            ],
          });
        }),
      );

      await act(async () => {
        await result.current.showCountButton();
      });

      await waitFor(() => {
        expect(result.current.isInCart).toBe(true);
        expect(result.current.itemQuantity).toBe(2);
      });

      server.use(
        http.get(`${ENDPOINT.CART_ITEMS}`, () => {
          return HttpResponse.json({
            content: [
              { id: 10, product: { id: 12 }, quantity: 2 },
              { id: 12, product: { id: 14 }, quantity: 2 },
              { id: 16, product: { id: 10 }, quantity: 1 },
            ],
          });
        }),
      );
      server.use(
        http.patch(`${ENDPOINT.CART_ITEMS}/16`, () => {
          return HttpResponse.json({});
        }),
      );

      await act(async () => {
        await result.current.handleAddCartItemQuantity();
      });

      await waitFor(() => {
        expect(result.current.isInCart).toBe(true);
        expect(result.current.itemQuantity).toBe(1);
      });
    });
  });
});
