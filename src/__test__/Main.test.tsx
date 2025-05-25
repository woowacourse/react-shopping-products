import { screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import Main from "../components/Main/Main";

import { renderWithProviders } from "./test-utils";

vi.mock("../apis/product/fetchProductList", () => {
  return {
    default: vi.fn(({ params }) => {
      const { category, sort = "price,asc" } = params;
      const allProducts = [
        { id: 1, name: "사과", price: 1000, category: "식료품", quantity: 10 },
        { id: 2, name: "바나나", price: 2000, category: "식료품", quantity: 5 },
        {
          id: 3,
          name: "짱구인형",
          price: 3000,
          category: "패션잡화",
          quantity: 0,
        },
        {
          id: 4,
          name: "철수인형",
          price: 4000,
          category: "패션잡화",
          quantity: 2,
        },
      ];

      const filtered =
        category === "전체"
          ? allProducts
          : allProducts.filter((p) => p.category === category);

      const sorted =
        sort === "price,asc"
          ? filtered
          : [...filtered].sort((a, b) => b.price - a.price);

      return Promise.resolve({ content: sorted });
    }),
  };
});

const fakeProps = {
  cartItems: [],
  handleAddProduct: vi.fn(),
  handleRemoveProduct: vi.fn(),
};

describe("Main 컴포넌트", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("상품 목록이 성공적으로 렌더링된다", async () => {
    renderWithProviders(<Main {...fakeProps} />);

    expect(await screen.findByText("사과")).toBeInTheDocument();
    expect(screen.getByText("바나나")).toBeInTheDocument();
    expect(screen.getByText("짱구인형")).toBeInTheDocument();
    expect(screen.getByText("철수인형")).toBeInTheDocument();
  });

  it("카테고리를 식료품으로 변경 시 fetchProductList 재호출된다", async () => {
    renderWithProviders(<Main {...fakeProps} />);

    const selects = screen.getAllByRole("combobox");
    const categorySelect = selects[0];

    fireEvent.change(categorySelect, { target: { value: "식료품" } });

    await waitFor(() => {
      expect(screen.getByText("사과")).not.toBeNull();
      expect(screen.getByText("바나나")).not.toBeNull();
      expect(screen.queryByText("짱구인형")).not.toBeInTheDocument();
      expect(screen.queryByText("철수인형")).not.toBeInTheDocument();
    });
  });

  it("카테고리를 패션잡화로 변경 시 짱구인형과 철수인형이 보인다.", async () => {
    renderWithProviders(<Main {...fakeProps} />);

    const selects = screen.getAllByRole("combobox");
    const categorySelect = selects[0];

    fireEvent.change(categorySelect, { target: { value: "패션잡화" } });

    await waitFor(() => {
      expect(screen.getByText("짱구인형")).toBeInTheDocument();
      expect(screen.getByText("철수인형")).toBeInTheDocument();
      expect(screen.queryByText("사과")).not.toBeInTheDocument();
      expect(screen.queryByText("바나나")).not.toBeInTheDocument();
    });
  });

  it("정렬 기준을 가격 내림차순으로 변경 시 fetchProductList 재호출된다", async () => {
    renderWithProviders(<Main {...fakeProps} />);

    const selects = screen.getAllByRole("combobox");
    const sortSelect = selects[1];

    fireEvent.change(sortSelect, { target: { value: "price,desc" } });

    const items = await screen.findAllByRole("listitem");

    const expectedOrder = ["철수인형", "짱구인형", "바나나", "사과"];

    const actualTexts = items.map((item) => item.textContent);

    await waitFor(() => {
      expectedOrder.forEach((expected, index) => {
        expect(actualTexts[index]).toContain(expected);
      });
    });
  });
});
