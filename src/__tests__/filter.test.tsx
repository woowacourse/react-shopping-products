import { screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import "@testing-library/jest-dom";
import { renderAppWithProviders } from "../test-utils/renderWithProviders";
import { products } from "../mocks/data";

describe("App에서는 필터링이 작동하며,", () => {
  beforeEach(() => {});
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });
  it('카테고리 드롭다운이 초기에는 "전체"로 설정되어 있어야 함', async () => {
    await renderAppWithProviders();
    const categoryDropdown = screen.getByText("전체");
    expect(categoryDropdown).toBeDefined();
  });

  it("카테고리 드롭다운을 클릭하면 옵션 목록이 표시되어야 함", async () => {
    await renderAppWithProviders();
    const categoryDropdown = screen.getByText("전체");

    fireEvent.click(categoryDropdown);

    expect(screen.getByText("패션잡화")).toBeDefined();
    expect(screen.getByText("식료품")).toBeDefined();
  });

  it("카테고리 옵션을 선택하면 해당 카테고리의 상품만 표시되어야 함", async () => {
    const fashionProductsCount = products.filter(
      (product) => product.category === "패션잡화"
    ).length;
    const foodProductsCount = products.filter(
      (product) => product.category === "식료품"
    ).length;
    const allProductsCount = products.length;

    await renderAppWithProviders();

    await waitFor(
      () => {
        const productCards = screen.queryAllByTestId("product-card");
        expect(productCards.length).toBeGreaterThan(0);
      },
      { timeout: 3000 }
    );

    const categoryDropdown = screen.getByText("전체");

    expect(screen.getAllByTestId("product-card")).toHaveLength(
      allProductsCount
    );

    fireEvent.click(categoryDropdown);
    const fashionOption = screen.getByText("패션잡화");
    fireEvent.click(fashionOption);

    await waitFor(
      () => {
        const productCards = screen.queryAllByTestId("product-card");
        expect(productCards.length).toBe(fashionProductsCount);
      },
      { timeout: 3000 }
    );

    fireEvent.click(categoryDropdown);
    const foodOption = screen.getByText("식료품");
    fireEvent.click(foodOption);

    await waitFor(
      () => {
        const productCards = screen.queryAllByTestId("product-card");
        expect(productCards.length).toBe(foodProductsCount);
      },
      { timeout: 3000 }
    );
  }, 10000);
});
