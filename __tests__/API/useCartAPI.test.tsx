import React from "react";
import { vi, describe, it, beforeEach, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import * as apiModule from "../../src/api/shoppingCart/getShoppingCart";
import {
  CartApiProvider,
  useCartApi,
} from "../../src/domain/contexts/CartApiContext";

describe("useCartApi test", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  function TestComponent() {
    const { cartData, cartStatus, cartError, refetchCart } = useCartApi();

    return (
      <div>
        <div data-testid="status">{cartStatus}</div>
        <div data-testid="error">{cartError}</div>
        <div data-testid="length">{cartData ? cartData.length : 0}</div>
        <button onClick={() => refetchCart()} data-testid="refetch">
          refetch
        </button>
      </div>
    );
  }

  it("성공적으로 데이터를 가져오면 cartStatus가 'success'가 되고 cartData가 설정된다", async () => {
    const fakeResponse = {
      content: [
        {
          id: 1,
          quantity: 2,
          product: {
            id: 100,
            name: "Test",
            price: 500,
            imageUrl: "",
            category: "test",
          },
        },
      ],
    };
    vi.spyOn(apiModule, "default").mockResolvedValue(fakeResponse);

    render(
      <CartApiProvider>
        <TestComponent />
      </CartApiProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("status").textContent).toBe("success");
    });

    expect(screen.getByTestId("length").textContent).toBe("1");
    expect(screen.getByTestId("error").textContent).toBe("");
  });

  it("API 호출이 실패하면 cartStatus가 'error'가 되고 cartError가 설정된다", async () => {
    vi.spyOn(apiModule, "default").mockRejectedValue(
      new Error("네트워크 오류")
    );

    render(
      <CartApiProvider>
        <TestComponent />
      </CartApiProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("status").textContent).toBe("error");
    });

    expect(screen.getByTestId("error").textContent).toBe("네트워크 오류");
    expect(screen.getByTestId("length").textContent).toBe("0");
  });

  it("refetchCart을 호출하면 다시 API를 호출한다", async () => {
    const fakeResponse1 = {
      content: [
        {
          id: 1,
          quantity: 2,
          product: {
            id: 100,
            name: "Test1",
            price: 500,
            imageUrl: "",
            category: "test",
          },
        },
      ],
    };
    const fakeResponse2 = {
      content: [
        {
          id: 2,
          quantity: 1,
          product: {
            id: 200,
            name: "Test2",
            price: 1000,
            imageUrl: "",
            category: "test2",
          },
        },
      ],
    };
    const spy = vi.spyOn(apiModule, "default");
    spy
      .mockResolvedValueOnce(fakeResponse1)
      .mockResolvedValueOnce(fakeResponse2);

    render(
      <CartApiProvider>
        <TestComponent />
      </CartApiProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("status").textContent).toBe("success");
    });
    expect(screen.getByTestId("length").textContent).toBe("1");

    await userEvent.click(screen.getByTestId("refetch"));

    await waitFor(() => {
      expect(screen.getByTestId("length").textContent).toBe("1");
      expect(spy).toHaveBeenCalledTimes(2);
    });
  });
});
