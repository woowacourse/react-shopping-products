import { act } from 'react';
import useCartItemHandler from '../src/hooks/useCartItemHandler';
import { renderHook, waitFor } from '@testing-library/react';
import { server } from '../src/mocks/server';
import { HttpResponse, http } from 'msw';
import ENDPOINT from '../src/api/endpoints';
import { wrapper } from './utils/test-utils';
import { useCartItem } from '../src/hooks/useCartItem';

const renderUseCartItemHook = () =>
  renderHook(
    () => {
      const { handleCartItemQuantity, handleDeleteCartItem, showCountButton } =
        useCartItemHandler({ productId: 11 });
      const { cartItems } = useCartItem();
      return {
        cartItems,
        handleCartItemQuantity,
        handleDeleteCartItem,
        showCountButton,
      };
    },
    {
      wrapper: wrapper,
    },
  );

describe('useCartItemHandler', () => {
  describe('장바구니에 상품 추가 및 삭제', () => {
    it('담기 버튼을 누르면 장바구니에 상품이 담겨야한다.', async () => {
      const { result } = renderUseCartItemHook();
      server.use(
        http.get(`${ENDPOINT.CART_ITEMS}`, () => {
          return HttpResponse.json({
            content: [
              { id: 10, product: { id: 12 } },
              { id: 12, product: { id: 14 } },
              { id: 11, product: { id: 14 }, quantity: 1 },
            ],
          });
        }),
      );
      await act(async () => {
        await result.current.showCountButton();
      });

      await waitFor(() => {
        expect(result.current.cartItems[2].quantity).toBe(1);
        console.log(result.current.cartItems);
      });
    });

    it('삭제 버튼을 누르면 장바구니에 상품이 삭제되어야한다.', async () => {
      const { result } = renderUseCartItemHook();

      server.use(
        http.get(`${ENDPOINT.CART_ITEMS}`, () => {
          return HttpResponse.json({
            content: [
              { id: 12, product: { id: 14 } },
              { id: 16, product: { id: 10 } },
            ],
          });
        }),
      );
      await act(async () => {
        await result.current.handleDeleteCartItem(10);
      });

      await waitFor(() => {
        expect(result.current.cartItems.length).toBe(2);
      });
    });

    it('+ - 버튼을 누르면 해당 상품 수량이 변경된다.', async () => {
      const { result } = renderUseCartItemHook();

      await waitFor(() => {
        expect(result.current.cartItems[1].quantity).toBe(1);
      });

      server.use(
        http.get(`${ENDPOINT.CART_ITEMS}`, () => {
          return HttpResponse.json({
            content: [
              { id: 10, product: { id: 12 } },
              { id: 12, product: { id: 14 }, quantity: 2 },
            ],
          });
        }),
      );

      await act(async () => {
        await result.current.handleCartItemQuantity(12, 2);
      });

      await waitFor(() => {
        expect(result.current.cartItems[1].quantity).toBe(2);
      });
    });
  });
});
