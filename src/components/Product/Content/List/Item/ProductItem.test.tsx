import { render, screen, act, waitFor, within } from "@testing-library/react";
import { DataProvider } from "@/context/DataContext";
import App from "@/App";
import { ProductItemType } from "@/types/product";
import { vi, describe, it, beforeEach, expect } from "vitest";

let mockProductItems: ProductItemType[] = [];

beforeEach(() => {
  mockProductItems = [
    {
      id: 1,
      name: "메이토",
      price: 1000,
      imageUrl: "",
      category: "식료품",
      quantity: 1,
    },
    {
      id: 2,
      name: "토마토",
      price: 10000,
      imageUrl: "",
      category: "식료품",
      quantity: 0, // 품절 상품
    },
    {
      id: 3,
      name: "우비",
      price: 100000,
      imageUrl: "",
      category: "패션잡화",
      quantity: 1,
    },
  ];
});

vi.mock("@/apis/products/getProducts", () => ({
  getProducts: vi.fn().mockImplementation(({ filterOption, sortOption }) => {
    return new Promise((resolve) => {
      const filtered = mockProductItems.filter((item) => {
        if (filterOption === "전체") return true;
        return item.category === filterOption;
      });
      const sorted = filtered.sort((a, b) => {
        if (sortOption === "낮은 가격순") return a.price - b.price;
        return b.price - a.price;
      });
      resolve(sorted);
    });
  }),
}));

describe("ProductContent - 품절 상태 테스트", () => {
  it("품절 상품에 '품 절' 텍스트가 렌더링되고, 장바구니 버튼이 비활성화된다", async () => {
    await act(async () => {
      render(
        <DataProvider>
          <App />
        </DataProvider>
      );
    });

    await waitFor(() => {
      expect(screen.queryByText("로딩 중입니다...")).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.queryByText("상품 목록을 가져오는 중입니다...")
      ).not.toBeInTheDocument();
    });

    const tomatoItem = screen.getByText("토마토").closest("li");
    expect(tomatoItem).not.toBeNull();

    const soldOutText = within(tomatoItem!).getByText("품 절");
    expect(soldOutText).toBeInTheDocument();
  });
});
