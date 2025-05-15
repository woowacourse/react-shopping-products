import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import App from "../App";

vi.mock("../contexts/ErrorContext", () => ({
  useErrorContext: () => ({
    showError: vi.fn(),
  }),
}));

vi.mock("../contexts/CartContext", () => ({
  useCartContext: () => ({
    setCartLength: vi.fn(),
    cartLength: 1,
  }),
}));

vi.mock("../hooks/useFetch", () => ({
  default: vi.fn((url) => {
    if (url.toString().includes("products")) {
      return {
        data: {
          content: [
            {
              id: 1,
              category: "패션잡화",
              name: "바지",
              price: 1000000,
              imageUrl: "laptop.jpg",
            },
            {
              id: 2,
              category: "패션잡화",
              name: "치마",
              price: 50000,
              imageUrl: "chair.jpg",
            },
            {
              id: 3,
              category: "식료품",
              name: "코카콜라",
              price: 2000,
              imageUrl: "coke.jpg",
            },
            {
              id: 4,
              category: "식료품",
              name: "사이다",
              price: 2000,
              imageUrl: "cider.jpg",
            },
          ],
        },
        isLoading: false,
        error: null,
        fetcher: vi.fn(),
      };
    }
    if (url.toString().includes("cart-items")) {
      return {
        data: {
          content: [
            {
              id: 101,
              product: {
                id: 2,
                category: "패션잡화",
                name: "치마",
                price: 50000,
                imageUrl: "chair.jpg",
              },
              quantity: 1,
            },
          ],
        },
        isLoading: false,
        error: null,
        fetcher: vi.fn(),
      };
    }
    return {
      data: { content: [] },
      isLoading: false,
      error: null,
      fetcher: vi.fn(),
    };
  }),
}));

describe("App - 필터링 테스트", () => {
  it("카테고리 필터링이 올바르게 동작한다", () => {
    render(<App />);

    const categoryDropdown = screen.getByText("전체");
    fireEvent.click(categoryDropdown);

    const electronicOption = screen.getByText("식료품");
    fireEvent.click(electronicOption);

    expect(screen.getByText("코카콜라")).toBeInTheDocument();
    expect(screen.getByText("사이다")).toBeInTheDocument();
    expect(screen.queryByText("바지")).not.toBeInTheDocument();
    expect(screen.queryByText("치마")).not.toBeInTheDocument();
  });
});

describe("App - 정렬 테스트", () => {
  it("정렬 옵션이 올바르게 동작한다", () => {
    render(<App />);

    const orderDropdown = screen.getByText("낮은 가격순");
    fireEvent.click(orderDropdown);

    const highPriceOption = screen.getByText("높은 가격순");
    fireEvent.click(highPriceOption);

    const products = screen.getAllByRole("listitem");
    expect(products[0]).toHaveTextContent("바지");
    expect(products[1]).toHaveTextContent("치마");
  });
});
