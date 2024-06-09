import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import useAddCartItem from '../useAddCartItem';
import useCartItemQuery from '../useCartItemQuery';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useAddCartItem 훅 테스트', () => {
  it('장바구니에 상품을 상품 ID로 추가한다.', async () => {
    const { result } = renderHook(
      () => {
        const { cartItems, cartItemsQuerySuccess } = useCartItemQuery();
        const { addCartItem, isAddCartItemSuccess } = useAddCartItem();

        return {
          addCartItem,
          isAddCartItemSuccess,
          cartItems,
          cartItemsQuerySuccess,
        };
      },
      { wrapper },
    );

    await waitFor(() => {
      expect(result.current.cartItemsQuerySuccess).toBe(true);
    });

    act(() => {
      result.current.addCartItem(59); // 스웨터 ID
    });

    await waitFor(() => {
      expect(result.current.isAddCartItemSuccess).toBe(true);
    });

    await waitFor(() => {
      expect(result.current.cartItemsQuerySuccess).toBe(true);
      expect(result.current.cartItems?.find((item) => item.product.id === 59)).toBeTruthy();
    });
  });

  it('장바구니에 상품을 상품 ID로 추가할 때, 존재하지 않는 상품 ID라면 에러를 받는다', async () => {
    const { result } = renderHook(
      () => {
        const { addCartItem, isAddCartItemError } = useAddCartItem();

        return {
          addCartItem,
          isAddCartItemError,
        };
      },
      { wrapper },
    );

    act(() => {
      result.current.addCartItem(1000); // 존재하지 않는 product ID
    });

    await waitFor(() => {
      expect(result.current.isAddCartItemError).toBe(true);
    });
  });
});
