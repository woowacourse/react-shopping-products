import { act, renderHook } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { beforeEach, describe, vi } from "vitest";
import { CartItem } from "../apis/types/response";
import { CartProvider } from "../features/cart/contexts/CartContext";
import { useCart } from "../features/cart/hooks/useCart";
import { ToastProvider } from "../shared/contexts/ToastContext";
import useFetch from "../shared/hooks/useFetch";
import { TOAST_TYPES } from "../shared/config/toast";
import { CartItemsAPI } from "../features/cart/apis/CartItemsAPI";

const initialCartItems: CartItem[] = [
  {
    id: 101,
    product: {
      id: 1,
      name: "테스트 상품",
      price: 1000,
      imageUrl: "test.js",
      category: "카테고리",
      quantity: 5,
    },
    quantity: 2,
  },
];

const mockShowToast = vi.fn();

vi.mock("../shared/hooks/useToast", () => ({
  default: () => ({ showToast: mockShowToast }),
}));

vi.mock("../shared/hooks/useFetch", () => ({
  default: vi.fn().mockImplementation((fetchFn) => {
    const fetchData = vi.fn().mockImplementation(async () => {
      const data = await fetchFn();
      return { data, success: true };
    });
    return { data: initialCartItems, success: true, fetchData };
  }),
}));

const wrapper = ({ children }: PropsWithChildren) => (
  <ToastProvider>
    <CartProvider>{children}</CartProvider>
  </ToastProvider>
);

describe("CartContext 테스트", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("초기 상태를 올바르게 설정한다.", async () => {
    (useFetch as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      (fetchFn) => {
        const fetchData = vi.fn().mockImplementation(async () => {
          const data = await fetchFn();
          return { data, success: true };
        });
        return { data: initialCartItems, success: true, fetchData };
      }
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    await act(async () => {
      await result.current.refetch();
    });

    expect(result.current.cart.items).toHaveLength(1);
    expect(result.current.cart.items).toEqual(initialCartItems);
    expect(result.current.cart.count).toBe(1);
    expect(result.current.cart.totalPrice).toBe(2000);
  });

  it("상품을 장바구니에 추가한다.", async () => {
    const postSpy = vi.spyOn(CartItemsAPI, "post");
    const newCartItem: CartItem[] = [
      ...initialCartItems,
      {
        id: 102,
        product: {
          id: 2,
          name: "새 상품",
          price: 1000,
          imageUrl: "test.js",
          category: "카테고리",
          quantity: 5,
        },
        quantity: 1,
      },
    ];

    (useFetch as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      () => ({
        data: newCartItem,
        success: true,
        fetchData: vi.fn(),
      })
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    await act(async () => {
      await result.current.product.add(2);
    });

    expect(postSpy).toHaveBeenCalledWith(2);
    expect(mockShowToast).toHaveBeenCalledWith({
      message: "상품이 장바구니에 추가되었습니다.",
      type: TOAST_TYPES.SUCCESS,
    });
    expect(result.current.cart.items).toHaveLength(2);
  });

  it("상품 수량을 증가시킨다.", async () => {
    const patchSpy = vi.spyOn(CartItemsAPI, "patch");

    (useFetch as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      () => ({
        data: initialCartItems,
        success: true,
        fetchData: vi.fn(),
      })
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    await act(async () => {
      await result.current.product.quantity.increase(1);
    });

    expect(patchSpy).toHaveBeenCalled();
    expect(patchSpy).toHaveBeenCalledWith(101, 3);
  });

  it("상품 수량을 감소시킨다. (1보다 크면 수량 감소)", async () => {
    const patchSpy = vi.spyOn(CartItemsAPI, "patch");

    (useFetch as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      () => ({
        data: initialCartItems,
        success: true,
        fetchData: vi.fn(),
      })
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    await act(async () => {
      await result.current.product.quantity.decrease(1);
    });

    expect(patchSpy).toHaveBeenCalledWith(101, 1);
  });

  it("상품 수량이 1이면 삭제한다.", async () => {
    const deleteSpy = vi.spyOn(CartItemsAPI, "delete");
    const newCartItem: CartItem[] = [
      {
        ...initialCartItems[0],
        quantity: 1,
      },
    ];

    (useFetch as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      () => ({
        data: newCartItem,
        success: true,
        fetchData: vi.fn(),
      })
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    await act(async () => {
      await result.current.product.quantity.decrease(1);
    });

    expect(deleteSpy).toHaveBeenCalledWith(101);
  });

  it("상품을 장바구니에서 삭제한다.", async () => {
    const deleteSpy = vi.spyOn(CartItemsAPI, "delete");
    const newCartItem: CartItem[] = [
      {
        ...initialCartItems[0],
        quantity: 1,
      },
    ];

    (useFetch as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      () => ({
        data: newCartItem,
        success: true,
        fetchData: vi.fn(),
      })
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    await act(async () => {
      await result.current.product.delete(101);
    });

    expect(deleteSpy).toHaveBeenCalledWith(101);
  });
});
