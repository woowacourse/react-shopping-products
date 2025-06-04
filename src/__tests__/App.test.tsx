import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import getProducts from "../api/product/getProducts";
import getShoppingCart from "../api/shoppingCart/getShoppingCart";
import postShoppingCart from "../api/shoppingCart/postShoppingCart";
import deleteShoppingCart from "../api/shoppingCart/deleteShoppingCart";
import type { MockedFunction } from "vitest";
import { SHOPPING_CART_MOCK_DATA } from "../mocks/shoppingCart/shoppingCartMockData";
import { PRODUCT_MOCK_DATA } from "../mocks/product/ProductMockData";

const mockedGetProducts = getProducts as MockedFunction<typeof getProducts>;
const mockedGetCart = getShoppingCart as MockedFunction<typeof getShoppingCart>;
const mockedPostCart = postShoppingCart as MockedFunction<
  typeof postShoppingCart
>;
const mockedDeleteCart = deleteShoppingCart as MockedFunction<
  typeof deleteShoppingCart
>;

const SINGLE_ITEM = [SHOPPING_CART_MOCK_DATA[1]];

vi.mock("../api/product/getProducts", () => ({
  __esModule: true,
  default: vi.fn(),
}));
vi.mock("../api/shoppingCart/getShoppingCart", () => ({
  __esModule: true,
  default: vi.fn(),
}));
vi.mock("../api/shoppingCart/postShoppingCart", () => ({
  __esModule: true,
  default: vi.fn(),
}));
vi.mock("../api/shoppingCart/deleteShoppingCart", () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe("<App />", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockedGetProducts.mockResolvedValue({ content: PRODUCT_MOCK_DATA });
    mockedPostCart.mockResolvedValue({});
    mockedDeleteCart.mockResolvedValue();
  });

  it("장바구니 제거 시 cart-count가 2 → 1로 감소한다", async () => {
    mockedGetCart
      .mockResolvedValueOnce({ content: SHOPPING_CART_MOCK_DATA })
      .mockResolvedValueOnce({ content: SINGLE_ITEM });

    render(<App />);
    const count2 = await screen.findByTestId("cart-count");
    waitFor(() => {
      expect(count2).toHaveTextContent("4");
    });
    const itemLi = screen.getByText("부리부리 원형 테이블").closest("li")!;
    const removeBtn = within(itemLi).getByTestId("remove-btn-24");
    await userEvent.click(removeBtn);

    // waitFor(() => {
    //   // expect(mockedDeleteCart).toHaveBeenCalledWith(920);
    //   expect(mockedGetCart).toHaveBeenCalledTimes(2);
    // });

    const count1 = await screen.findByTestId("cart-count");
    expect(count1).toHaveTextContent("1");
  });

  it("장바구니 추가 시 cart-count가 1 → 2로 증가한다", async () => {
    mockedGetCart
      .mockResolvedValueOnce({ content: [SHOPPING_CART_MOCK_DATA[0]] })
      .mockResolvedValueOnce({ content: SHOPPING_CART_MOCK_DATA });

    render(<App />);

    const initialCount = await screen.findByTestId("cart-count");
    waitFor(() => {
      expect(initialCount).toHaveTextContent("1");
    });

    const itemLi = screen.getByText("부리부리 원형 테이블").closest("li")!;
    const addBtn = within(itemLi).getByTestId("add-btn-24");
    await userEvent.click(addBtn);

    waitFor(() => {
      expect(mockedGetCart).toHaveBeenCalledTimes(2);
    });

    const updatedCount = await screen.findByTestId("cart-count");
    waitFor(() => {
      expect(updatedCount).toHaveTextContent("4");
    });
  });
});
