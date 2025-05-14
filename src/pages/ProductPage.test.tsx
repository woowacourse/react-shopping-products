// 장바구니 데이터 가져오기
import { render, screen, act, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { expect, describe, it } from "vitest";
import ProductPage from "./ProductPage";

const { mockCartItems } = vi.hoisted(() => {
  return {
    mockCartItems: [
      {
        id: 1,
        quantity: 2,
        product: {
          id: 1,
          name: "ㅎㅇ",
          price: 1000,
          imageUrl: "",
          category: "패션잡화",
        },
      },
    ],
  };
});

vi.mock("@/apis/cartItems/getCartItems", () => ({
  getCartItems: vi.fn().mockResolvedValue(mockCartItems),
}));

vi.mock("@/apis/wrapPromise", () => ({
  wrapPromise: () => ({
    read: () => mockCartItems,
  }),
}));

describe("ProductPage Component", () => {
  it("장바구니 데이터를 성공적으로 불러와서 Header에 표시해야 함", async () => {
    await act(async () => {
      render(<ProductPage />);
    });

    await waitFor(() => {
      expect(screen.queryByTestId("cart-item-quantity")?.textContent).toBe("1");
    });
  });
});
