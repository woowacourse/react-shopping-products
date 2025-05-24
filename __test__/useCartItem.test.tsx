import { QueryProvider } from "@/modules/Query";
import { useCartItem } from "@/pages/products/hooks";
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

describe("useCartItem", () => {
  it("productsStatus, cartItemsStatus, products, cartItems 값을 불러온다.", async () => {
    const { result } = renderHook(() => useCartItem(), {
      wrapper: ({ children }) => <QueryProvider>{children}</QueryProvider>,
    });
    await vi.waitFor(() => {
      expect(result.current.productsStatus).toBe("success");
      expect(result.current.cartItemsStatus).toBe("success");
    });

    expect(result.current.products.content).toBeDefined();
    expect(result.current.cartItems.content).toBeDefined();
  });

  it("increaseCartItem: 장바구니에 없는 상품을 추가하면 cartItems에 추가된다.", async () => {
    const { result } = renderHook(() => useCartItem(), {
      wrapper: ({ children }) => <QueryProvider>{children}</QueryProvider>,
    });

    await vi.waitFor(() => {
      expect(result.current.productsStatus).toBe("success");
      expect(result.current.cartItemsStatus).toBe("success");
    });

    const productId = result.current.products.content[0].id;
    await act(async () => {
      await result.current.increaseCartItem(productId);
    });

    expect(result.current.cartItems.content.some((item) => item.product?.id === productId)).toBe(true);
  });

  it("increaseCartItem: 이미 있는 상품의 수량이 1 증가한다.", async () => {
    const { result } = renderHook(() => useCartItem(), {
      wrapper: ({ children }) => <QueryProvider>{children}</QueryProvider>,
    });

    await vi.waitFor(() => {
      expect(result.current.productsStatus).toBe("success");
      expect(result.current.cartItemsStatus).toBe("success");
    });

    const productId = result.current.cartItems.content[0].product.id;
    const prevQuantity = result.current.cartItems.content[0].quantity;

    await act(async () => {
      await result.current.increaseCartItem(productId);
    });

    const updatedItem = result.current.cartItems.content.find((item) => item.product.id === productId);
    if (!updatedItem) return;

    expect(updatedItem.quantity).toBe(prevQuantity + 1);
  });

  it("decreaseCartItem: 수량이 2 이상인 상품을 감소시키면 수량이 1 감소한다.", async () => {
    const { result } = renderHook(() => useCartItem(), {
      wrapper: ({ children }) => <QueryProvider>{children}</QueryProvider>,
    });

    await vi.waitFor(() => {
      expect(result.current.productsStatus).toBe("success");
      expect(result.current.cartItemsStatus).toBe("success");
    });

    const item = result.current.cartItems.content.find((i) => i.quantity > 1);
    if (!item) return;

    const prevQuantity = item.quantity;
    await act(async () => {
      await result.current.decreaseCartItem(item.product.id);
    });

    const updatedItem = result.current.cartItems.content.find((i) => i.product.id === item.product.id);

    if (!updatedItem) return;

    expect(updatedItem.quantity).toBe(prevQuantity - 1);
  });

  it("decreaseCartItem: 수량이 1인 상품을 감소시키면 cartItems에서 삭제된다.", async () => {
    const { result } = renderHook(() => useCartItem(), {
      wrapper: ({ children }) => <QueryProvider>{children}</QueryProvider>,
    });

    await vi.waitFor(() => {
      expect(result.current.productsStatus).toBe("success");
      expect(result.current.cartItemsStatus).toBe("success");
    });

    const item = result.current.cartItems.content.find((i) => i.quantity === 1);
    if (!item) return;

    await act(async () => {
      await result.current.decreaseCartItem(item.product.id);
    });

    console.log(result.current.cartItems.content, item.product.id);

    expect(result.current.cartItems.content.some((i) => i.product.id === item.product.id)).toBe(false);
  });
});
