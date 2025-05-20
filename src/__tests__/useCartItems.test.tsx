import { renderHook, waitFor } from "@testing-library/react";
import useCartItems from "../hooks/useCartItems";
import { deleteCartItems, getCartItems, postCartItems } from "../apis/cartItem";
import { mockCartItemsResponse } from "./mocks/mockCartItem";
import { ErrorProvider, LoadingProvider } from "../contexts";

// 1. API 함수 모킹
vi.mock("../apis/cartItem");

const mockedGetCartItems = vi.mocked(getCartItems);
const mockedPostCartItem = vi.mocked(postCartItems);
const mockedDeleteCartItem = vi.mocked(deleteCartItems);

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ErrorProvider>
    <LoadingProvider>{children}</LoadingProvider>
  </ErrorProvider>
);

describe("useCartItems 훅 테스트", () => {
  beforeEach(() => {
    mockedGetCartItems.mockResolvedValue(mockCartItemsResponse);
    mockedPostCartItem.mockResolvedValue(undefined);
    mockedDeleteCartItem.mockResolvedValue(undefined);
  });

  it("장바구니 목록을 불러올 수 있다.", async () => {
    const { result } = renderHook(() => useCartItems(), { wrapper });

    await waitFor(() => {
      expect(result.current.cartItems).toEqual(mockCartItemsResponse.content);
    });
  });

  it("product id와 장바구니 id가 매치된 객체를 불러올 수 있다.", async () => {
    const { result } = renderHook(() => useCartItems(), { wrapper });

    const mockCartItemIds = Object.fromEntries(
      (mockCartItemsResponse?.content || []).map((item) => [item.product.id, item.id]),
    );

    await waitFor(() => {
      expect(result.current.cartItemIds).toEqual(mockCartItemIds);
    });
  });

  // it("장바구니에 상품을 추가할 수 있다", async () => {
  //   const productId = 1;
  //   const { result } = renderHook(() => useCartItems());

  //   await waitFor(() => {
  //     expect(result.current.isCartItemsLoading).toBe(false);
  //   });

  //   const initialCartItems = result.current.cartItems?.content;

  //   if (!initialCartItems) {
  //     throw new Error("장바구니 목록이 없습니다.");
  //   }

  //   await waitFor(() => {
  //     expect(result.current.isCartItemsLoading).toBe(false);
  //   });

  //   await result.current.addCart(productId);

  //   await waitFor(() => {
  //     expect(result.current.isCartItemsLoading).toBe(false);
  //   });

  //   expect(result.current.cartItems).toBeDefined();
  //   expect(result.current.cartItems?.content.length).toBe(initialCartItems?.length + 1);

  //   await result.current.removeCart(result!.current!.cartItemIds![productId]);
  // });

  // it("장바구니에 상품을 삭제할 수 있다", async () => {
  //   const productId = 2;
  //   const { result } = renderHook(() => useCartItems());

  //   await waitFor(() => {
  //     expect(result.current.isCartItemsLoading).toBe(false);
  //   });

  //   await result.current.addCart(productId);
  //   await waitFor(() => {
  //     expect(result.current.isCartItemsLoading).toBe(false);
  //   });
  //   const initialCartItems = result.current.cartItems?.content;

  //   if (!initialCartItems) {
  //     throw new Error("장바구니 목록이 없습니다.");
  //   }
  //   console.log(result!.current!.cartItemIds);
  //   await result.current.removeCart(result!.current!.cartItemIds![productId]);

  //   await waitFor(() => {
  //     expect(result.current.isCartItemsLoading).toBe(false);
  //   });

  //   expect(result.current.cartItems).toBeDefined();
  //   expect(result.current.cartItems?.content.length).toBe(initialCartItems?.length - 1);
  // });
});
