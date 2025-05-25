import { act, renderHook, waitFor } from "@testing-library/react";
import { Mock, vi } from "vitest";
import useProducts from "../shared/hooks/useProducts";
import { ProductsAPI } from "../entities/product/api";

vi.mock("../apis/products", () => ({
  ProductsAPI: {
    get: vi.fn(),
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

describe("useProducts 훅 - 상품 필터링 및 정렬 기능", () => {
  const mockSetErrorMessage = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    (ProductsAPI.get as Mock).mockResolvedValue(mockProducts);
  });

  it("초기 상태가 올바르게 설정된다.", async () => {
    const { result } = renderHook(() => useProducts(mockSetErrorMessage));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.selectedCategory).toBe("전체");
    expect(result.current.selectedSortOption).toBe("낮은 가격 순");

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(ProductsAPI.get).toHaveBeenCalledWith("전체", "낮은 가격 순");

    expect(result.current.products).toEqual(mockProducts);
  });

  it("카테고리 변경 시 해당 카테고리의 상품만 요청한다.", async () => {
    const filteredMockProducts = {
      ...mockProducts,
      content: mockProducts.content.filter(
        (product) => product.category === "패션잡화"
      ),
      totalElements: 2,
      numberOfElements: 2,
    };

    (ProductsAPI.get as Mock)
      .mockResolvedValueOnce(mockProducts)
      .mockResolvedValueOnce(filteredMockProducts);

    const { result } = renderHook(() => useProducts(mockSetErrorMessage));

    expect(ProductsAPI.get).toHaveBeenCalledWith("전체", "낮은 가격 순");

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.products).toEqual(mockProducts);

    act(() => {
      result.current.setSelectedCategory("패션잡화");
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(ProductsAPI.get).toHaveBeenCalledWith("패션잡화", "낮은 가격 순");

    expect(result.current.products).toEqual(filteredMockProducts);
    expect(result.current.products?.content.length).toBe(2);
    expect(
      result.current.products?.content.every(
        (product) => product.category === "패션잡화"
      )
    ).toBe(true);
  });

  it("가격순 정렬 옵션 변경 시 상품이 높은 가격순으로 정렬된다.", async () => {
    const sortedMockProducts = {
      ...mockProducts,
      content: [...mockProducts.content].sort((a, b) => b.price - a.price),
    };

    (ProductsAPI.get as Mock)
      .mockResolvedValueOnce(mockProducts)
      .mockResolvedValueOnce(sortedMockProducts);

    const { result } = renderHook(() => useProducts(mockSetErrorMessage));

    expect(ProductsAPI.get).toHaveBeenCalledWith("전체", "낮은 가격 순");

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.products).toEqual(mockProducts);

    act(() => {
      result.current.setSelectedSortOption("높은 가격 순");
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(ProductsAPI.get).toHaveBeenCalledWith("전체", "높은 가격 순");

    expect(result.current.products).toEqual(sortedMockProducts);

    const productPrices =
      result.current.products?.content.map((product) => product.price) || [];
    expect(productPrices).toEqual([40000, 30000, 20000, 10000]);
  });

  it("카테고리와 정렬 옵션 모두 적용 시 해당 조건의 상품만 정렬되어 표시된다.", async () => {
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

    (ProductsAPI.get as Mock)
      .mockResolvedValueOnce(mockProducts)
      .mockResolvedValueOnce(filteredMockProducts)
      .mockResolvedValueOnce(filteredAndSortedMockProducts);

    const { result } = renderHook(() => useProducts(mockSetErrorMessage));

    expect(ProductsAPI.get).toHaveBeenCalledWith("전체", "낮은 가격 순");

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.products).toEqual(mockProducts);

    act(() => {
      result.current.setSelectedCategory("패션잡화");
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(ProductsAPI.get).toHaveBeenCalledWith("패션잡화", "낮은 가격 순");
    expect(result.current.products).toEqual(filteredMockProducts);

    expect(result.current.products?.content.length).toBe(2);
    expect(
      result.current.products?.content.every(
        (product) => product.category === "패션잡화"
      )
    ).toBe(true);

    act(() => {
      result.current.setSelectedSortOption("높은 가격 순");
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(ProductsAPI.get).toHaveBeenCalledWith("패션잡화", "높은 가격 순");
    expect(result.current.products).toEqual(filteredAndSortedMockProducts);

    const productNames =
      result.current.products?.content.map((product) => product.name) || [];
    const productPrices =
      result.current.products?.content.map((product) => product.price) || [];

    expect(productNames).toEqual(["패션잡화 상품2", "패션잡화 상품1"]);
    expect(productPrices).toEqual([40000, 30000]);
  });

  it("API 에러 발생 시 에러 메시지를 설정한다.", async () => {
    (ProductsAPI.get as Mock).mockResolvedValue({
      error: "상품을 불러오는 중 오류가 발생했습니다.",
    });

    renderHook(() => useProducts(mockSetErrorMessage));

    await waitFor(() => {
      expect(mockSetErrorMessage).toHaveBeenCalledWith(
        "상품을 불러오는 중 오류가 발생했습니다."
      );
    });
  });
});
