import { render, screen, waitFor } from "@testing-library/react";
import ProductCardList from "../components/productCardList/ProductCardList";
import { describe, it, expect } from "vitest";

function Wrapper({
  sort,
  setErrorTrue = () => {},
}: {
  sort: "낮은 가격순" | "높은 가격순";
  setErrorTrue?: (type: unknown) => void;
}) {
  return (
    <ProductCardList
      category="전체"
      sort={sort}
      cartItemIds={[]}
      setCartItemIds={() => {}}
      setErrorTrue={setErrorTrue}
      syncCartWithServer={() => {}}
    />
  );
}

// 💡 "숫자 추출 유틸"
function extractPricesFromScreen(): number[] {
  return screen
    .getAllByText(/원$/)
    .map((el) => el.textContent?.replace(/[^\d]/g, "") || "")
    .map(Number);
}

describe("상품 정렬 테스트", () => {
  it("낮은 가격순(오름차순) 정렬이 되어야 한다", async () => {
    render(<Wrapper sort="낮은 가격순" />);

    await waitFor(() => {
      const prices = extractPricesFromScreen();
      expect(prices).toHaveLength(20);
      const sorted = [...prices].sort((a, b) => a - b);
      expect(prices).toEqual(sorted);
    });
  });

  it("높은 가격순(내림차순) 정렬이 되어야 한다", async () => {
    render(<Wrapper sort="높은 가격순" />);

    await waitFor(() => {
      const prices = extractPricesFromScreen();
      expect(prices).toHaveLength(20);
      const sorted = [...prices].sort((a, b) => b - a);
      expect(prices).toEqual(sorted);
    });
  });

  it("같은 가격의 상품이 있을 때, 이름 오름차순으로 정렬되어야 한다", async () => {
    render(<Wrapper sort="낮은 가격순" />);

    await waitFor(() => {
      const prices = extractPricesFromScreen();
      const names = screen
        .getAllByRole("heading", { level: 3 })
        .map((el) => el.textContent || "");

      const targetPrice = 10000;
      const samePriceNames = names.filter((_, i) => prices[i] === targetPrice);

      const sorted = [...samePriceNames].sort();
      expect(samePriceNames).toEqual(sorted);
    });
  });
});
