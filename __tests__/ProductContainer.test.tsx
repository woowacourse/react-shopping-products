import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as productApi from "../src/api/getProducts";
import { vi, describe, it, afterEach } from "vitest";
import ProductListContainer from "../src/Component/Product/ProductListContainer";
import {
  CartContext,
  CartContextValue,
  Status,
} from "../src/contexts/CartContext";
import { MOCK_PRODUCTS } from "./Constants";
import React from "react";

const mockUpdateCartItems = vi.fn();
const mockGetMatchCartItem = vi.fn();
const mockUpdateErrorMessage = vi.fn();
const mockCheckMax = vi.fn();

const defaultCartContext: CartContextValue = {
  cartItems: [],
  status: "success" as Status,
  errorMessage: [],
  updateErrorMessage: mockUpdateErrorMessage,
  updateCartItems: mockUpdateCartItems,
  getMatchCartItem: mockGetMatchCartItem,
  checkMax: mockCheckMax,
};

function renderWithContext(ui: React.ReactElement, contextValue = {}) {
  return render(
    <CartContext.Provider value={{ ...defaultCartContext, ...contextValue }}>
      {ui}
    </CartContext.Provider>
  );
}

describe("ProductListContainer", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it("상품 목록을 성공적으로 렌더링한다", async () => {
    vi.spyOn(productApi, "default").mockResolvedValue({
      content: MOCK_PRODUCTS,
    });

    renderWithContext(<ProductListContainer />);

    for (const p of MOCK_PRODUCTS) {
      expect(await screen.findByText(p.name)).toBeInTheDocument();
      expect(
        screen.getByText(p.price.toLocaleString("ko") + "원")
      ).toBeInTheDocument();
    }
  });

  it("카테고리 패션잡화를 선택하면 패션잡화만 나타난다", async () => {
    vi.spyOn(productApi, "default")
      .mockResolvedValueOnce({ content: MOCK_PRODUCTS })
      .mockResolvedValueOnce({
        content: MOCK_PRODUCTS.filter((p) => p.category === "패션잡화"),
      });

    renderWithContext(<ProductListContainer />);

    const select = await screen.findByRole("combobox", {
      name: /카테고리/i,
    });
    const optionFashion = screen.getByRole("option", {
      name: "패션잡화",
    });
    await userEvent.selectOptions(select, optionFashion);

    const fashionItems = MOCK_PRODUCTS.filter((p) => p.category === "패션잡화");
    for (const p of fashionItems) {
      expect(await screen.findByText(p.name)).toBeInTheDocument();
    }
    const groceryItems = MOCK_PRODUCTS.filter((p) => p.category === "식료품");
    for (const p of groceryItems) {
      expect(screen.queryByText(p.name)).toBeNull();
    }
  });
});
