import useHandleCartItem from "@/hooks/useHandleCartItem";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, act, waitFor } from "@testing-library/react";

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("장바구니 관련 테스트", () => {
  it("장바구니에 있는 아이템 담기 버튼을 누르면 장바구니에서 추가된다.", async () => {
    const { result } = renderHook(() => useHandleCartItem(), {
      wrapper,
    });

    const cartId = 777;

    expect(result.current.isInCart(cartId)).toBe(false);

    result.current.addCartItem(cartId);

    await waitFor(() => expect(result.current.isInCart(cartId)).toBe(true));
  });

  it("장바구니에 있는 아이템 수량의 + 버튼을 누르면 아이템 갯수가 1개 추가된다.", async () => {
    const { result } = renderHook(() => useHandleCartItem(), {
      wrapper,
    });

    const productId = 2;

    expect(result.current.isInCart(productId)).toBe(true);

    await waitFor(() => {
      const itemQuantity = result.current.getCartItemQuantity(productId);

      expect(itemQuantity).toBe(3);
    });

    await act(() => {
      result.current.updateCartItemQuantity(productId, "plus");
    });

    await waitFor(() => {
      const itemQuantity = result.current.getCartItemQuantity(productId);

      expect(itemQuantity).toBe(4);
    });
  });

  it("장바구니에 있는 아이템 수량의 - 버튼을 누르면 아이템 갯수가 1개 줄어든다.", async () => {
    const { result } = renderHook(() => useHandleCartItem(), {
      wrapper,
    });

    const productId = 2;

    expect(result.current.isInCart(productId)).toBe(true);

    await waitFor(() => {
      const itemQuantity = result.current.getCartItemQuantity(productId);

      expect(itemQuantity).toBe(4);
    });

    result.current.updateCartItemQuantity(productId, "minus");

    await waitFor(() => {
      const itemQuantity = result.current.getCartItemQuantity(productId);

      expect(itemQuantity).toBe(3);
    });
  });

  it("장바구니에 있는 아이템 수량이 1개인 경우 - 버튼을 누르면 장바구니에서 삭제된다.", async () => {
    const { result } = renderHook(() => useHandleCartItem(), {
      wrapper,
    });

    const productId = 1;

    expect(result.current.isInCart(productId)).toBe(true);

    await waitFor(() => {
      const itemQuantity = result.current.getCartItemQuantity(productId);

      expect(itemQuantity).toBe(1);
    });

    act(() => {
      result.current.updateCartItemQuantity(productId, "minus");
    });

    await waitFor(() => {
      expect(result.current.isInCart(productId)).toBe(false);
    });
  });
});
