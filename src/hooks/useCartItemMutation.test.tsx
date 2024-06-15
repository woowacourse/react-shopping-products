import { renderHook, waitFor } from "@testing-library/react";
import useCartItemMutation from "./useCartItemMutation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useCartItemsQuery from "./useCartItemsQuery";
import { act } from "react";
import { ErrorProvider } from "../context/ErrorContext";

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ErrorProvider>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </ErrorProvider>
);

describe("useCartItemMutation", () => {
  it("장바구니 상품의 수량을 증가시킬 수 있다.", async () => {
    const { result } = renderHook(
      () => {
        const { cartItems } = useCartItemsQuery();
        const { handleIncreaseQuantityButtonClick } = useCartItemMutation();

        return {
          cartItems,
          handleIncreaseQuantityButtonClick,
        };
      },
      {
        wrapper,
      }
    );

    await waitFor(() => expect(result.current.cartItems).not.toHaveLength(0));

    const firstCartItem = result.current.cartItems![0];
    const quantity = firstCartItem.quantity;

    await waitFor(() =>
      expect(result.current.cartItems![0].quantity).toBe(quantity)
    );

    act(() => result.current.handleIncreaseQuantityButtonClick(firstCartItem));

    await waitFor(() =>
      expect(result.current.cartItems![0].quantity).toBe(quantity + 1)
    );
  });

  it("장바구니 상품의 수량을 감소시킬 수 있다.", async () => {
    const { result } = renderHook(
      () => {
        const { cartItems } = useCartItemsQuery();
        const { handleDecreaseQuantityButtonClick } = useCartItemMutation();

        return {
          cartItems,
          handleDecreaseQuantityButtonClick,
        };
      },
      {
        wrapper,
      }
    );

    await waitFor(() => expect(result.current.cartItems).not.toHaveLength(0));

    const firstCartItem = result.current.cartItems![0];
    const quantity = firstCartItem.quantity;

    await waitFor(() =>
      expect(result.current.cartItems![0].quantity).toBe(quantity)
    );

    act(() => result.current.handleDecreaseQuantityButtonClick(firstCartItem));

    await waitFor(() =>
      expect(result.current.cartItems![0].quantity).toBe(quantity - 1)
    );
  });

  it("장바구니 상품을 제거할 수 있다.", async () => {
    const { result } = renderHook(
      () => {
        const { cartItems } = useCartItemsQuery();
        const { handleRemoveItemButtonClick } = useCartItemMutation();

        return {
          cartItems,
          handleRemoveItemButtonClick,
        };
      },
      { wrapper }
    );

    await waitFor(() => expect(result.current.cartItems).not.toHaveLength(0));

    const removingCartItem = result.current.cartItems![0];

    await waitFor(() => expect(result.current.cartItems).toHaveLength(7));

    act(() => result.current.handleRemoveItemButtonClick(removingCartItem));

    await waitFor(() => expect(result.current.cartItems).toHaveLength(6));
  });
});
