import { act, renderHook } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, vi } from "vitest";
import { Product } from "../apis/types/response";
import { ProductsAPI } from "../features/product/apis/ProductsAPI";
import { ProductProvider } from "../features/product/contexts/ProductContext";
import { useProduct } from "../features/product/hooks/useProduct";
import useFetch from "../shared/hooks/useFetch";

const { initialProducts } = vi.hoisted(() => {
  return {
    initialProducts: [
      {
        id: 1,
        name: "상품 1",
        price: 1000,
        imageUrl: "image1.jpg",
        category: "식료품",
        quantity: 10,
      },
      {
        id: 2,
        name: "상품 2",
        price: 2000,
        imageUrl: "image2.jpg",
        category: "패션잡화",
        quantity: 5,
      },
    ] as Product[],
  };
});

vi.mock("../shared/hooks/useFetch", () => ({
  default: vi.fn().mockReturnValue({
    data: initialProducts,
    success: true,
    loading: false,
    fetchData: vi.fn().mockResolvedValue({
      data: initialProducts,
      success: true,
    }),
  }),
}));

vi.mock("../features/product/apis/ProductsAPI", () => ({
  ProductsAPI: {
    get: vi.fn().mockResolvedValue(initialProducts),
  },
}));

const wrapper = ({ children }: PropsWithChildren) => (
  <MemoryRouter>
    <ProductProvider>{children}</ProductProvider>
  </MemoryRouter>
);

describe("ProductContext 테스트", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useFetch as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: initialProducts,
      success: true,
      loading: false,
      fetchData: vi.fn().mockImplementation(async (params) => {
        await ProductsAPI.get(params.category, params.sortOption);
        return { data: initialProducts, success: true };
      }),
    });
  });

  it("초기 상태를 올바르게 설정한다.", async () => {
    const { result } = renderHook(() => useProduct(), { wrapper });

    expect(result.current.products).toEqual(initialProducts);
    expect(result.current.category.value).toBe("전체");
    expect(result.current.sort.value).toBe("낮은 가격 순");
    expect(result.current.loading).toBe(false);
  });

  it("카테고리를 변경하면 API를 다시 호출한다.", async () => {
    const getSpy = vi.spyOn(ProductsAPI, "get");

    const { result } = renderHook(() => useProduct(), { wrapper });

    await act(async () => {
      result.current.category.set("식료품");
    });

    expect(getSpy).toHaveBeenCalledWith("식료품", "낮은 가격 순");
    expect(result.current.category.value).toBe("식료품");
  });

  it("정렬 옵션을 변경하면 API를 다시 호출한다.", async () => {
    const getSpy = vi.spyOn(ProductsAPI, "get");
    const { result } = renderHook(() => useProduct(), { wrapper });

    await act(async () => {
      result.current.sort.set("높은 가격 순");
    });

    expect(getSpy).toHaveBeenCalledWith("전체", "높은 가격 순");
    expect(result.current.sort.value).toBe("높은 가격 순");
  });

  it("refetch를 호출하면 현재 필터로 API를 다시 호출한다.", async () => {
    const getSpy = vi.spyOn(ProductsAPI, "get");

    const { result } = renderHook(() => useProduct(), { wrapper });

    await act(async () => {
      result.current.category.set("식료품");
      result.current.sort.set("높은 가격 순");
    });

    getSpy.mockClear();

    await act(async () => {
      await result.current.refetch();
    });

    expect(getSpy).toHaveBeenCalledWith("식료품", "높은 가격 순");
  });

  it("URL 검색 매개변수가 업데이트된다.", async () => {
    const { result } = renderHook(() => useProduct(), { wrapper });

    await act(async () => {
      result.current.category.set("식료품");
      result.current.sort.set("높은 가격 순");
    });

    expect(result.current.category.value).toBe("식료품");
    expect(result.current.sort.value).toBe("높은 가격 순");
  });
});
