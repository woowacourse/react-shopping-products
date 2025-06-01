import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { expect, vi } from "vitest";
import App from "../App";
import { CartItemsAPI } from "../apis/cartItems";
import { ProductsAPI } from "../apis/products";

vi.mock("../apis/products", () => ({
  ProductsAPI: {
    get: vi.fn(),
  },
}));

vi.mock("../apis/cartItems", () => ({
  CartItemsAPI: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

const mockProducts = {
  content: [
    {
      id: 1,
      name: "식료품 상품1",
      price: 10000,
      imageUrl: "/test1.jpg",
      category: "식료품",
    },
    {
      id: 2,
      name: "식료품 상품2",
      price: 20000,
      imageUrl: "/test2.jpg",
      category: "식료품",
    },
    {
      id: 3,
      name: "패션잡화 상품1",
      price: 30000,
      imageUrl: "/test3.jpg",
      category: "패션잡화",
    },
    {
      id: 4,
      name: "패션잡화 상품2",
      price: 40000,
      imageUrl: "/test4.jpg",
      category: "패션잡화",
    },
  ],
  totalElements: 4,
  totalPages: 1,
  size: 4,
  number: 0,
  sort: { empty: false, sorted: true, unsorted: false },
  pageable: {
    offset: 0,
    pageNumber: 0,
    pageSize: 20,
    paged: true,
    unpaged: false,
    sort: { empty: false, sorted: true, unsorted: false },
  },
  numberOfElements: 4,
  first: true,
  last: true,
  empty: false,
};

describe("상품 목록 카테고리 필터링 및 정렬 기능 테스트", () => {
  beforeEach(async () => {
    vi.resetAllMocks();

    (ProductsAPI.get as any).mockResolvedValue(mockProducts);
    (CartItemsAPI.get as any).mockResolvedValue({
      content: [],
      totalElements: 0,
      numberOfElements: 0,
      empty: true,
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("식료품 상품1")).toBeInTheDocument();
      expect(screen.getByText("식료품 상품2")).toBeInTheDocument();
      expect(screen.getByText("패션잡화 상품1")).toBeInTheDocument();
      expect(screen.getByText("패션잡화 상품2")).toBeInTheDocument();
    });

    expect(ProductsAPI.get).toHaveBeenCalledWith("전체", "낮은 가격 순");
  });

  test("카테고리 변경 시 해당 카테고리의 상품만 요청한다.", async () => {
    const filteredMockProducts = {
      ...mockProducts,
      content: mockProducts.content.filter(
        (product) => product.category === "패션잡화"
      ),
      totalElements: 2,
      numberOfElements: 2,
    };

    (ProductsAPI.get as any).mockResolvedValueOnce(filteredMockProducts);

    const categorySelect = screen.getByTestId("category-select");

    fireEvent.change(categorySelect, { target: { value: "패션잡화" } });

    await waitFor(() => {
      expect(ProductsAPI.get).toHaveBeenCalledWith("패션잡화", "낮은 가격 순");
    });

    expect(screen.queryByText("식료품 상품1")).not.toBeInTheDocument();
    expect(screen.queryByText("식료품 상품2")).not.toBeInTheDocument();
    expect(screen.getByText("패션잡화 상품1")).toBeInTheDocument();
    expect(screen.getByText("패션잡화 상품2")).toBeInTheDocument();

    const productItems = screen.getAllByTestId("product-item");
    expect(productItems).toHaveLength(2);

    const productNames = screen.getAllByTestId("product-name");
    expect(productNames).toHaveLength(2);

    productNames.forEach((item) => {
      expect(item).toHaveTextContent("패션잡화");
    });
  });

  test("가격순 정렬 옵션 변경 시 상품이 높은 가격순으로 정렬된다.", async () => {
    const sortedMockProducts = {
      ...mockProducts,
      content: [...mockProducts.content].sort((a, b) => b.price - a.price),
    };

    (ProductsAPI.get as any).mockResolvedValueOnce(sortedMockProducts);

    const sortSelect = screen.getByTestId("sort-select");

    fireEvent.change(sortSelect, { target: { value: "높은 가격 순" } });

    await waitFor(() => {
      expect(ProductsAPI.get).toHaveBeenCalledWith("전체", "높은 가격 순");
    });

    const productItems = screen.getAllByTestId("product-item");

    const productPrices = productItems.map((item) => {
      const priceText = within(item).getByTestId("product-price").textContent;
      return parseInt(priceText?.replace(/[^0-9]/g, "") || "0");
    });

    const sortedPrices = [...productPrices].sort((a, b) => b - a);
    expect(productPrices).toEqual(sortedPrices);

    const productNames = productItems.map(
      (item) => within(item).getByTestId("product-name").textContent
    );

    // 40000원, 30000원, 20000원, 10000원
    expect(productNames).toEqual([
      "패션잡화 상품2",
      "패션잡화 상품1",
      "식료품 상품2",
      "식료품 상품1",
    ]);
  });

  test("카테고리와 정렬 옵션 모두 적용 시 해당 조건의 상품만 정렬되어 표시된다.", async () => {
    const filteredMockProducts = {
      ...mockProducts,
      content: mockProducts.content.filter(
        (product) => product.category === "패션잡화"
      ),
      totalElements: 2,
      numberOfElements: 2,
    };
    const filteredAndSortedMockProducts = {
      ...mockProducts,
      content: mockProducts.content
        .filter((product) => product.category === "패션잡화")
        .sort((a, b) => b.price - a.price),
      totalElements: 2,
      numberOfElements: 2,
    };

    (ProductsAPI.get as any)
      .mockResolvedValueOnce(filteredMockProducts)
      .mockResolvedValueOnce(filteredAndSortedMockProducts);

    const categorySelect = screen.getByTestId("category-select");
    fireEvent.change(categorySelect, { target: { value: "패션잡화" } });

    await waitFor(() => {
      expect(ProductsAPI.get).toHaveBeenCalledWith("패션잡화", "낮은 가격 순");
    });

    const sortSelect = screen.getByTestId("sort-select");
    fireEvent.change(sortSelect, { target: { value: "높은 가격 순" } });

    await waitFor(() => {
      expect(ProductsAPI.get).toHaveBeenCalledWith("패션잡화", "높은 가격 순");
    });

    const productItems = screen.getAllByTestId("product-item");
    expect(productItems).toHaveLength(2);

    const productPrices = productItems.map((item) => {
      const priceText = within(item).getByTestId("product-price").textContent;
      return parseInt(priceText?.replace(/[^0-9]/g, "") || "0");
    });

    const sortedPrices = [...productPrices].sort((a, b) => b - a);
    expect(productPrices).toEqual(sortedPrices);

    const productNames = productItems.map(
      (item) => within(item).getByTestId("product-name").textContent
    );

    expect(productNames).toEqual(["패션잡화 상품2", "패션잡화 상품1"]);
  });
});
