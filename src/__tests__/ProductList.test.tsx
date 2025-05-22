import "@testing-library/jest-dom";
import { cleanup, screen } from "@testing-library/react";
import { vi } from "vitest";
import { Product } from "../types/product";
import { setupUseDataMock } from "../test-utils/setupUseDataMock";
import { renderProductListWithProviders } from "../test-utils/renderWithProviders";

vi.mock("../contexts/ErrorContext", () => ({
  useErrorContext: () => ({ showError: vi.fn(), error: null }),
  ErrorContextProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

vi.mock("../contexts/QueryContext", () => ({
  useQueryContext: () => ({
    dataPool: { products: [...mockProducts] },
    productsQuery: "낮은 가격순",
    setProductsQuery: vi.fn(),
  }),
  QueryContextProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Product 1",
    price: 10000,
    category: "Category A",
    imageUrl: "image1.jpg",
  },
  {
    id: 2,
    name: "Product 2",
    price: 20000,
    category: "Category B",
    imageUrl: "image2.jpg",
  },
];

describe("ProductList는 ", () => {
  beforeEach(() => {
    setupUseDataMock({ productsLoading: false, cartLoading: false });
  });
  afterEach(() => {
    cleanup();
    vi.resetModules();
    vi.clearAllMocks();
  });
  it("아이템을 정상적으로 출력해야한다.", async () => {
    await renderProductListWithProviders(mockProducts);

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByText("10,000원")).toBeInTheDocument();
    expect(screen.getByText("20,000원")).toBeInTheDocument();
  });

  it("상품이 없을 경우 상품이 없다는 메시지를 출력해야한다.", async () => {
    await renderProductListWithProviders([]);

    expect(screen.getByText("상품이 없습니다.")).toBeInTheDocument();
  });

  it("product를 받지 못했을경우, 서버와 연결이 좋지 않다는 메시지를 출력해야한다.", async () => {
    await renderProductListWithProviders(undefined);

    expect(
      screen.getByText("서버와 연결이 좋지 않아요. 다시 시도해주세요.")
    ).toBeInTheDocument();
  });
});
