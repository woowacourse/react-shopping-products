import useHandleCartItem from "@/hooks/useHandleCartItem";
import CartItemProvider from "@/provider/cartItemProvider";
import { renderHook, act, waitFor } from "@testing-library/react";
import { ReactNode } from "react";
import mockCartItems from "@/mocks/mockResponse/cart-items.json";
import initialCartItems from "@/mocks/mockResponse/initial-cart-items.json";

beforeEach(() => {
  Object.assign(mockCartItems, JSON.parse(JSON.stringify(initialCartItems)));
});

describe("장바구니 관련 테스트", () => {
  it("장바구니에 있는 아이템 빼기 버튼을 누르면 장바구니에서 제거된다.", async () => {
    const { result } = renderHook(() => useHandleCartItem(), {
      wrapper: ({ children }) => <CartItemProvider>{children}</CartItemProvider>,
    });

    const productId = 3;

    await waitFor(() => {
      expect(result.current.isInCart(productId)).toBe(false);
    });

    act(() => {
      result.current.onClickCartItem(productId);
    });

    await waitFor(() => {
      expect(result.current.isInCart(productId)).toEqual(true);
    });
  });
  it("아이템을 담으면 해당 아이템이 '장바구니에 있는 상태'가 된다.", async () => {
    const { result } = renderHook(() => useHandleCartItem(), {
      wrapper: ({ children }) => <CartItemProvider>{children}</CartItemProvider>,
    });

    const productId = 2;

    await waitFor(() => {
      expect(result.current.isInCart(productId)).toBe(false);
    });

    act(() => {
      result.current.onClickCartItem(productId);
    });

    await waitFor(() => {
      expect(result.current.isInCart(productId)).toBe(false);
    });

    act(() => {
      result.current.onClickCartItem(productId);
    });

    await waitFor(() => {
      expect(result.current.isInCart(productId)).toBe(false);
    });
  });
  it("아이템을 담으면, 장바구니의 count가 1 증가한다.", async () => {
    const wrapper = ({ children }: { children: ReactNode }) => <CartItemProvider>{children}</CartItemProvider>;
    const { result: handleCartResult } = renderHook(() => useHandleCartItem(), {
      wrapper,
    });

    const productId = 21;

    const beforeCartCount = mockCartItems.content.length;
    await waitFor(() => {
      expect(handleCartResult.current.cartItems.length).toBe(beforeCartCount);
      expect(handleCartResult.current.isInCart(productId)).toBe(false);
    });

    act(() => {
      handleCartResult.current.onClickCartItem(productId);
    });

    await waitFor(() => {
      expect(handleCartResult.current.cartItems.length).toBe(beforeCartCount + 1);
      expect(handleCartResult.current.isInCart(productId)).toBe(true);
    });
  });

  it("아이템을 빼면, 장바구니의 count가 1 감소한다.", async () => {
    const wrapper = ({ children }: { children: ReactNode }) => <CartItemProvider>{children}</CartItemProvider>;
    const { result: handleCartResult } = renderHook(() => useHandleCartItem(), {
      wrapper,
    });

    const productId = 21;

    const beforeCartCount = mockCartItems.content.length;

    await waitFor(() => {
      expect(handleCartResult.current.cartItems.length).toBe(beforeCartCount);
      expect(handleCartResult.current.isInCart(productId)).toBe(false);
    });

    act(() => {
      handleCartResult.current.onClickCartItem(productId);
    });

    await waitFor(() => {
      expect(handleCartResult.current.cartItems.length).toBe(beforeCartCount + 1);
      expect(handleCartResult.current.isInCart(productId)).toBe(true);
    });

    act(() => {
      handleCartResult.current.onClickCartItem(productId);
    });

    await waitFor(() => {
      expect(handleCartResult.current.cartItems.length).toBe(beforeCartCount);
      expect(handleCartResult.current.isInCart(productId)).toBe(false);
    });
  });
});
