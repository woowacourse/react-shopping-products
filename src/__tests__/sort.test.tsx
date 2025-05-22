import "@testing-library/jest-dom";
import { screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { renderAppWithProviders } from "../test-utils/renderWithProviders";

vi.mock("../components/Product/ProductCard/ProductCard", () => ({
  __esModule: true,
  default: ({ productId, price }: { productId: number; price: number }) => (
    <li data-testid="product-card" data-price={price}>
      mock-{productId}
    </li>
  ),
}));

describe("App에서는 정렬이 작동하며,", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('카테고리 드롭다운이 초기에는 "낮은 가격순"로 설정되어 있어야 한다', async () => {
    await renderAppWithProviders();

    const sortDropdown = screen.getByText("낮은 가격순");
    expect(sortDropdown).toBeDefined();
  });

  it("카테고리 옵션을 선택하면 각 정렬 기준에 따라 정렬된 상품이 표시되어야 한다.", async () => {
    await renderAppWithProviders();

    // 로딩 상태가 끝날 때까지 대기
    await waitFor(() => {
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
    });

    // 현재 표시된 상품 가격을 확인 (낮은 가격순 정렬 확인)
    const pricesAsc = getPrices();
    function getPrices() {
      return screen
        .getAllByTestId("product-card")
        .map((li) => Number(li.getAttribute("data-price")));
    }

    // 낮은 가격순인지 확인 (이미 정렬되어 있어야 함)
    const sortedAsc = [...pricesAsc].sort((a, b) => a - b);
    expect(pricesAsc).toEqual(sortedAsc);

    // 정렬 드롭다운을 클릭해 옵션 목록 표시
    const sortDropdown = screen.getByText("낮은 가격순");
    fireEvent.click(sortDropdown);

    // 옵션 목록에서 "높은 가격순" 선택
    const highToLowOption = screen.getByText("높은 가격순");
    fireEvent.click(highToLowOption);

    // 로딩 상태가 끝날 때까지 대기
    await waitFor(() => {
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
    });

    // 상태 업데이트 후 내림차순 정렬 확인
    await waitFor(() => {
      const prices = getPrices();
      const sortedDesc = [...prices].sort((a, b) => b - a);
      expect(prices).toEqual(sortedDesc);
    });
  });
});
