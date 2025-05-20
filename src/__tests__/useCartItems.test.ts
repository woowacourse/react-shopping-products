import { renderHook, waitFor } from "@testing-library/react";
import useCartItems from "../hooks/useCartItems";

describe("useCartItems integration (real API)", () => {
  it("장바구니 목록을 보여준다 (실제 API)", async () => {
    const { result } = renderHook(() => useCartItems());

    await waitFor(() => {
      expect(result.current.isCartItemsLoading).toBe(false);
    });

    expect(result.current.cartItems).toBeDefined();
  });

  it("장바구니에 상품을 추가할 수 있다", async () => {
    const productId = 1;
    const { result } = renderHook(() => useCartItems());

    await waitFor(() => {
      expect(result.current.isCartItemsLoading).toBe(false);
    });

    const initialCartItems = result.current.cartItems?.content;

    if (!initialCartItems) {
      throw new Error("장바구니 목록이 없습니다.");
    }

    await waitFor(() => {
      expect(result.current.isCartItemsLoading).toBe(false);
    });

    await result.current.addCart(productId);

    await waitFor(() => {
      expect(result.current.isCartItemsLoading).toBe(false);
    });

    expect(result.current.cartItems).toBeDefined();
    expect(result.current.cartItems?.content.length).toBe(initialCartItems?.length + 1);

    await result.current.removeCart(result!.current!.cartItemIds![productId]);
  });

  it("장바구니에 상품을 삭제할 수 있다", async () => {
    const productId = 2;
    const { result } = renderHook(() => useCartItems());

    await waitFor(() => {
      expect(result.current.isCartItemsLoading).toBe(false);
    });

    await result.current.addCart(productId);
    await waitFor(() => {
      expect(result.current.isCartItemsLoading).toBe(false);
    });
    const initialCartItems = result.current.cartItems?.content;

    if (!initialCartItems) {
      throw new Error("장바구니 목록이 없습니다.");
    }
    console.log(result!.current!.cartItemIds);
    await result.current.removeCart(result!.current!.cartItemIds![productId]);

    await waitFor(() => {
      expect(result.current.isCartItemsLoading).toBe(false);
    });

    expect(result.current.cartItems).toBeDefined();
    expect(result.current.cartItems?.content.length).toBe(initialCartItems?.length - 1);
  });
});
