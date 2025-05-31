import { act, renderHook, waitFor } from "@testing-library/react";
import useCartItems from "../hooks/useCartItems";
import { ErrorProvider } from "../contexts";
import { server } from "../mocks/node";
import { QueryProvider } from "../contexts/QueryContext";
import MOCKING_CART_ITEMS_DATA from "../../src/mocks/data/cartItems.json";
import MOCKING_PRODUCT_DATA from "../../src/mocks/data/products.json";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ErrorProvider>
    <QueryProvider>{children}</QueryProvider>
  </ErrorProvider>
);

describe("useCartItems 훅 테스트", () => {
  const { id: productId, price, quantity } = MOCKING_PRODUCT_DATA.content[0];

  it("장바구니 목록을 불러올 수 있다.", async () => {
    const { result } = renderHook(() => useCartItems(), { wrapper });

    await waitFor(() => {
      expect(result.current.cartItems).toEqual(MOCKING_CART_ITEMS_DATA.content);
    });
  });

  it("handleCartItem(type: 'add') 호출 시 장바구니 항목이 증가한다.", async () => {
    const { result } = renderHook(() => useCartItems(), { wrapper });
    const prevLength = result.current.cartItems!.length;

    await act(async () => {
      await result.current.handleCartItem("add", productId);
    });

    await waitFor(() => {
      expect(result.current.cartItems!.length).toBe(prevLength + 1);
    });
  });

  it("handleCartItem(type: 'update') 호출 시 수량이 변경된다.", async () => {
    const { result } = renderHook(() => useCartItems(), { wrapper });

    const targetId = result.current.cartItems![0].id;
    const targetBeforeQuantity = result.current.cartItems![0].quantity;

    await act(async () => {
      await result.current.handleCartItem("update", targetId, targetBeforeQuantity + 1);
    });

    await waitFor(() => {
      const updatedItem = result.current.cartItems?.find((i) => i.id === targetId);
      expect(updatedItem?.quantity).toBe(targetBeforeQuantity + 1);
    });
  });

  it("handleCartItem(type: 'remove') 호출 시 항목이 제거된다.", async () => {
    const { result } = renderHook(() => useCartItems(), { wrapper });
    const targetId = result.current.cartItems![0].id;

    await act(async () => {
      await result.current.handleCartItem("remove", targetId);
    });

    await waitFor(() => {
      expect(result.current.cartItems?.some((item) => item.id === targetId)).toBe(false);
    });
  });

  it("장바구니에 담긴 상품의 총 금액을 확인할 수 있다.", async () => {
    const { result } = renderHook(() => useCartItems(), { wrapper });

    await act(async () => {
      await result.current.handleCartItem("add", productId);
    });
    const targetId = result.current.cartItems![0].id;
    const targetBeforeQuantity = result.current.cartItems![0].quantity;

    await act(async () => {
      await result.current.handleCartItem("update", targetId, targetBeforeQuantity + 1);
    });

    await waitFor(() => {
      expect(result.current.cartItemTotalPrice).toEqual(price * (targetBeforeQuantity + 1));
    });
    await act(async () => {
      await result.current.handleCartItem("remove", targetId);
    });
  });

  it("재고 수량을 초과하여 장바구니에 담을 시, 에러가 발생한다.", async () => {
    const { result } = renderHook(() => useCartItems(), { wrapper });

    await act(async () => {
      await result.current.handleCartItem("add", productId);
    });
    const targetId = result.current.cartItems![0].id;
    const targetBeforeQuantity = result.current.cartItems![0].quantity;

    await act(async () => {
      await result.current.handleCartItem("update", targetId, targetBeforeQuantity + 1);
      await result.current.handleCartItem("update", targetId, targetBeforeQuantity + 1);
      await result.current.handleCartItem("update", targetId, targetBeforeQuantity + 1);
    });

    await waitFor(() => {
      const currentItem = result.current.cartItems?.find((item) => item.id === targetId);
      expect(currentItem?.quantity).toBeLessThanOrEqual(quantity);
    });
  });
});
