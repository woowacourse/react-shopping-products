import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ProductListPage from "../src/pages/ProductListPage";
import { vi } from "vitest";
import { APIProvider } from "../src/contexts/API/APIProvider";
import { ErrorProvider } from "../src/contexts/Error/ErrorProvider";
import { server } from "../src/mocks/node";
import { mockProducts } from "../src/mocks/mockData";

describe("ProductListPage 필터링 & 정렬 테스트", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("상품 목록을 화면에 렌더링할 수 있다", async () => {
    render(
      <APIProvider>
        <ErrorProvider>
          <ProductListPage isOpen={false} handleModal={vi.fn()} />
        </ErrorProvider>
      </APIProvider>
    );

    const items = await screen.findAllByTestId("product-card");
    expect(items).toHaveLength(20);
  });

  it("식료품 카테고리만 렌더링할 수 있다", async () => {
    render(
      <APIProvider>
        <ErrorProvider>
          <ProductListPage isOpen={false} handleModal={vi.fn()} />
        </ErrorProvider>
      </APIProvider>
    );

    const categorySelect = screen.getByRole("combobox", { name: "filter" });

    fireEvent.change(categorySelect, { target: { value: "식료품" } });

    const expectedCount = mockProducts.filter(
      (product) => product.category === "식료품"
    ).length;

    await waitFor(async () => {
      const items = await screen.findAllByTestId("product-card");
      expect(items.length).toBe(expectedCount);
    });
  });

  it("낮은 가격순으로 정렬되면 가격 오름차순으로 상품을 렌더링할 수 있다.", async () => {
    render(
      <APIProvider>
        <ErrorProvider>
          <ProductListPage isOpen={false} handleModal={vi.fn()} />
        </ErrorProvider>
      </APIProvider>
    );

    const sortingSelect = screen.getByRole("combobox", { name: "sorting" });
    fireEvent.change(sortingSelect, { target: { value: "낮은 가격순" } });

    const prices = await screen.findAllByTestId("product-price");

    const expectedPrice = prices.map((priceEl) =>
      parseInt(priceEl.textContent!.replace(/[^\d]/g, ""), 10)
    );

    const sorted = [...expectedPrice].sort((a, b) => a - b);
    expect(expectedPrice).toEqual(sorted);
  });

  it("에러 발생 시 에러 메시지가 렌더링된다", async () => {
    vi.mock("../src/contexts/Error/ErrorContext", () => ({
      useErrorContext: () => ({
        error: {
          isError: true,
          errorMessage: "상품 목록을 불러오는 데 실패했습니다.",
        },
        handleError: vi.fn(),
      }),
    }));

    render(
      <APIProvider>
        <ErrorProvider>
          <ProductListPage isOpen={false} handleModal={vi.fn()} />
        </ErrorProvider>
      </APIProvider>
    );

    const errorMessage = await screen.findByText(
      "상품 목록을 불러오는 데 실패했습니다."
    );
    expect(document.body.contains(errorMessage)).toBe(true);
  });
});
