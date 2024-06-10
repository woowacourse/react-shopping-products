import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react';

import { ToastProvider } from '@/components/common/toast/Toast';
import theme from '@/theme';

import useCartItemList from '@/hooks/useCartItemList';

describe('cartItemList', () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>{children}</ToastProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
  beforeEach(() => {
    queryClient.clear();
  });
  afterEach(() => {
    queryClient.clear();
  });

  describe('장바구니에 상품 추가 테스트', async () => {
    it(`상품을 장바구니에 담으면 장바구니 전체 수량이 1 증가한다.`, async () => {
      const productId = 81;
      const { result } = renderHook(() => useCartItemList(), { wrapper });
      await waitFor(() => {
        expect(result.current.cartItemList).toHaveLength(10);
      });

      await waitFor(async () => {
        act(() => {
          result.current.addCartItemMutation(productId);
        });
      });

      await waitFor(() => {
        expect(result.current.cartItemList).toHaveLength(11);
      });
    });
    it(`상품을 장바구니에 담으면 해당 상품이 장바구니에 추가된다.`, async () => {
      const productId = 81;
      const { result } = renderHook(() => useCartItemList(), { wrapper });

      await waitFor(async () => {
        act(() => {
          result.current.addCartItemMutation(productId);
        });
      });

      await waitFor(() => {
        expect(result.current.matchCartItem(productId)).toBeTruthy;
      });
    });
  });
  describe('장바구니 수량 삭제 테스트', () => {
    it(`상품을 장바구니서 삭제하면 장바구니 전체 수량이 1 감소한다.`, async () => {
      const cartItemId = 15527;

      const { result } = renderHook(() => useCartItemList(), { wrapper });
      await waitFor(() => {
        expect(result.current.cartItemList).toHaveLength(11);
      });

      await waitFor(async () => {
        act(() => {
          result.current.deleteCartItemMutation(cartItemId);
        });
      });
      await waitFor(() => {
        expect(result.current.cartItemList).toHaveLength(10);
      });
    });
  });

  describe('장바구니 상품 수량 조절 테스트', () => {
    it(`장바구니에 담긴 상품의 수량을 10으로 변경할 수 있다.`, async () => {
      const productId = 169;
      const cartItemId = 10938;
      const { result } = renderHook(() => useCartItemList(), { wrapper });
      await waitFor(() => {
        expect(result.current.cartItemList).toHaveLength(10);
      });

      await waitFor(async () => {
        act(() => {
          result.current.adjustCartItemQuantityMutation({ cartItemId: cartItemId, quantity: 10 });
        });
      });

      await waitFor(() => {
        const quantity = result.current.getCartItemQuantity(productId);
        expect(quantity).toBe(10);
      });
    });
  });
});
