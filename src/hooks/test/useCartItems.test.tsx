import { act, renderHook, waitFor } from '@testing-library/react';
import { useCartItems } from '../useCartItems';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useCartItems 훅 테스트', () => {
  describe('장바구니 상품 목록 조회 테스트', () => {
    it('장바구니 상품 요청시, 장바구니 상품 데이터를 받아온다', async () => {
      const { result } = renderHook(() => useCartItems(), { wrapper });

      act(() => {
        result.current.getCartItems();
      });

      await waitFor(() => {
        expect(result.current.cartItems).toHaveLength(6);
      });
    });

    describe('장바구니 상품 추가 테스트', () => {
      it('장바구니에 상품을 상품 ID로 추가한다.', async () => {
        const { result } = renderHook(() => useCartItems(), { wrapper });

        act(() => {
          result.current.pushCartItem(59); // 스웨터 ID
        });

        await waitFor(() => {
          expect(result.current.cartItems?.find((item) => item.product.id === 59)).toBeTruthy();
        });
      });

      it('장바구니에 상품을 상품 ID로 추가할 때, 존재하지 않는 상품 ID라면 에러를 받는다', async () => {
        const { result } = renderHook(() => useCartItems(), { wrapper });

        act(() => {
          result.current.pushCartItem(1000); // 존재하지 않는 product ID
        });

        await waitFor(() => {
          expect(result.current.errorCartItemsFetch.isError).toBeTruthy();
        });
      });
    });
    describe('장바구니 상품 제거 테스트', () => {
      it('장바구니에서 상품을 장바구니 ID로 제거한다.', async () => {
        const { result } = renderHook(() => useCartItems(), { wrapper });

        act(() => {
          result.current.popCartItem(11295); // 양말의 장바구니 ID
        });

        await waitFor(() => {
          // console.log(
          //   'asdfadf',
          //   result.current.cartItems?.find((item) => item.id === 11295),
          // );
          expect(result.current.cartItems?.find((item) => item.id === 11295)).toBeFalsy();
        });
      });

      it('장바구니에서 상품을 장바구니 ID로 제거할 때, 존재하지 않는 장바구니 ID라면 에러를 받는다.', async () => {
        const { result } = renderHook(() => useCartItems(), { wrapper });

        act(() => {
          result.current.popCartItem(1); // 존재하지 않는 장바구니 ID
        });

        await waitFor(() => {
          expect(result.current.errorCartItemsFetch.isError).toBeTruthy();
        });
      });
    });
  });
});
