import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import React from "react";
import ProductCardList from "../components/productCardList/ProductCardList";
import { CartProvider } from "../hooks/useCart";
import { ProductPageResponse } from "../types/response.types";

const mockCartContext = {
  cartItemIds: [],
  setCartItemIds: () => {},
  fetchCartProducts: () => Promise.resolve(),
  setErrorTrue: () => {},
};

function renderWithCart(children: React.ReactNode) {
  return render(<CartProvider {...mockCartContext}>{children}</CartProvider>);
}

describe("ProductCardList 컴포넌트", () => {
  it("20개의 상품을 렌더링해야 한다", async () => {
    const mockedProducts: ProductPageResponse = {
      content: Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        name: `상품 ${i + 1}`,
        price: 10000,
        imageUrl: "",
        category: "식료품",
      })),
      totalPages: 1,
      size: 20,
    };

    renderWithCart(
      <ProductCardList
        isLoading={false}
        products={mockedProducts}
        setErrorTrue={() => {}}
      />
    );

    await waitFor(() => {
      const headings = screen.getAllByRole("heading", { level: 3 });
      expect(headings).toHaveLength(20);
    });
  });

  it("낮은 가격순으로 정렬된 데이터를 그대로 렌더링해야 한다", async () => {
    const sortedProducts: ProductPageResponse = {
      content: [
        { id: 1, name: "상품1", price: 1000, imageUrl: "", category: "식료품" },
        { id: 2, name: "상품2", price: 2000, imageUrl: "", category: "식료품" },
        { id: 3, name: "상품3", price: 3000, imageUrl: "", category: "식료품" },
      ],
      totalPages: 1,
      size: 3,
    };

    renderWithCart(
      <ProductCardList
        isLoading={false}
        products={sortedProducts}
        setErrorTrue={() => {}}
      />
    );

    await waitFor(() => {
      const prices = screen
        .getAllByText(/원$/)
        .map((el) => el.textContent?.replace(/[^\d]/g, "") || "")
        .map(Number);

      expect(prices).toEqual([1000, 2000, 3000]);
    });
  });

  it("같은 가격의 상품이 이름순으로 정렬된 데이터를 렌더링해야 한다", async () => {
    const sortedByName: ProductPageResponse = {
      content: [
        { id: 1, name: "감자", price: 10000, imageUrl: "", category: "식료품" },
        { id: 2, name: "사과", price: 10000, imageUrl: "", category: "식료품" },
        { id: 3, name: "호박", price: 10000, imageUrl: "", category: "식료품" },
      ],
      totalPages: 1,
      size: 3,
    };

    renderWithCart(
      <ProductCardList
        isLoading={false}
        products={sortedByName}
        setErrorTrue={() => {}}
      />
    );

    await waitFor(() => {
      const names = screen
        .getAllByRole("heading", { level: 3 })
        .map((el) => el.textContent);

      expect(names).toEqual(["감자", "사과", "호박"]);
    });
  });

  it("로딩 중일 때 Skeleton UI가 렌더링되어야 한다", () => {
    renderWithCart(
      <ProductCardList
        isLoading={true}
        products={null}
        setErrorTrue={() => {}}
      />
    );

    expect(screen.getByTestId("product-skeleton")).toBeInTheDocument();
  });
});
