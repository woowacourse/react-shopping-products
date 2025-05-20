import { render, screen } from "@testing-library/react";
import ProductListPage from "../src/pages/ProductListPage";
import { vi } from "vitest";
import * as useProductsContextModule from "../src/contexts/products/useProductsContext";
import * as useShoppingCartContextModule from "../src/contexts/shoppingCart/useShoppingCartContext";
import type { Mock } from "vitest";
import { mockProducts } from "./mockProducts";

vi.mock("../src/contexts/products/useProductsContext");
vi.mock("../src/contexts/shoppingCart/useShoppingCartContext");

describe("ProductListPage 필터링 & 정렬 테스트", () => {
  beforeEach(() => {
    (
      useShoppingCartContextModule.useShoppingCartContext as Mock
    ).mockReturnValue({
      cartItems: [],
      shoppingCartError: { isError: false, errorMessage: "" },
      isShoppingLoading: false,
    });
  });

  it("식료품 카테고리만 렌더링할 수 있다.", () => {
    const filteredProducts = mockProducts.filter(
      (p) => p.category === "식료품"
    );

    (useProductsContextModule.useProductsContext as Mock).mockReturnValue({
      products: filteredProducts,
      productsError: { isError: false, errorMessage: "" },
      isProductsLoading: false,
      handleChangeSort: vi.fn(),
      handleChangeCategory: vi.fn(),
    });

    render(<ProductListPage />);

    filteredProducts.forEach((product) => {
      expect(screen.getByText(product.name)).not.toBeNull();
    });

    const nonFoodProducts = mockProducts.filter((p) => p.category !== "식료품");
    nonFoodProducts.forEach((product) => {
      expect(screen.queryByText(product.name)).toBeNull();
    });
  });

  it("낮은 가격순으로 정렬되면 가격 오름차순으로 상품을 렌덜이 할 수 있다. ", () => {
    const sortedProducts = [...mockProducts].sort((a, b) => a.price - b.price);

    (useProductsContextModule.useProductsContext as Mock).mockReturnValue({
      products: sortedProducts,
      productsError: { isError: false, errorMessage: "" },
      isProductsLoading: false,
      handleChangeSort: vi.fn(),
      handleChangeCategory: vi.fn(),
    });

    render(<ProductListPage />);

    const productElements = screen.getAllByTestId("product-name");
    const renderedNames = productElements.map((el) => el.textContent?.trim());
    const expectedNames = sortedProducts.map((p) => p.name);

    expect(renderedNames).toEqual(expectedNames);
  });

  it("상품 목록을 화면에 렌더링할 수 있다", () => {
    (useProductsContextModule.useProductsContext as Mock).mockReturnValue({
      products: mockProducts,
      productsError: { isError: false, errorMessage: "" },
      isProductsLoading: false,
      handleChangeSort: vi.fn(),
      handleChangeCategory: vi.fn(),
    });

    render(<ProductListPage />);
    mockProducts.forEach((product) => {
      expect(screen.getByText(product.name)).not.toBeNull();
    });
  });

  it("로딩 중일 때 스피너가 렌더링된다.", () => {
    (useProductsContextModule.useProductsContext as Mock).mockReturnValue({
      products: [],
      productsError: { isError: false, errorMessage: "" },
      isProductsLoading: true,
      handleChangeSort: vi.fn(),
      handleChangeCategory: vi.fn(),
    });

    (
      useShoppingCartContextModule.useShoppingCartContext as Mock
    ).mockReturnValue({
      cartItems: [],
      shoppingCartError: { isError: false, errorMessage: "" },
      isShoppingLoading: true,
    });

    render(<ProductListPage />);
    expect(screen.getByTestId("loading-spinner")).not.toBeNull();
  });

  it("에러 발생 시 에러 메시지가 렌더링된다", () => {
    (useProductsContextModule.useProductsContext as Mock).mockReturnValue({
      products: [],
      productsError: {
        isError: true,
        errorMessage: "상품을 불러오지 못했습니다.",
      },
      isProductsLoading: false,
      handleChangeSort: vi.fn(),
      handleChangeCategory: vi.fn(),
    });

    render(<ProductListPage />);
    expect(screen.getByText(/상품을 불러오지 못했습니다./)).not.toBeNull();
  });
});
