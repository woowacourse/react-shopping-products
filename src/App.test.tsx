import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, expect, test, vi, beforeEach } from "vitest";
import App from "./App";

const mockProductListApi = vi.fn();

const mockCartItemListApi = vi.fn();
const mockAddProductItemApi = vi.fn();
const mockRemoveProductItemApi = vi.fn();

vi.mock("./api/ProductListApi", () => ({
  default: ({ category, sort }: { category: string; sort: string }) =>
    mockProductListApi({ category, sort }),
}));

vi.mock("./api/CartItemListApi", () => ({
  default: () => mockCartItemListApi(),
}));

vi.mock("./api/AddProductItemApi", () => ({
  default: (productId: number, quantity: number) =>
    mockAddProductItemApi(productId, quantity),
}));

vi.mock("./api/RemoveProductItemApi", () => ({
  default: (productId: number) => mockRemoveProductItemApi(productId),
}));

vi.mock("./api/constants/errorMessages", () => ({
  API_ERROR_MESSAGES: {
    400: "잘못된 요청입니다. 입력값을 확인해주세요.",
    401: "서비스에 접속할 수 없습니다. 잠시 후 다시 시도하거나 관리자에게 문의하세요.",
    403: "접근 권한이 없습니다.",
    404: "요청한 리소스를 찾을 수 없습니다.",
    500: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
  },
  DEFAULT_ERROR_MESSAGE: "알수없는 오류가 발생했습니다.",
}));

const mockProducts = [
  {
    id: 1,
    name: "사과",
    price: 2000,
    imageUrl: "https://example.com/apple.jpg",
    category: "식료품",
  },
  {
    id: 2,
    name: "바나나",
    price: 3000,
    imageUrl: "https://example.com/banana.jpg",
    category: "식료품",
  },
  {
    id: 3,
    name: "모자",
    price: 15000,
    imageUrl: "https://example.com/hat.jpg",
    category: "패션잡화",
  },
  {
    id: 4,
    name: "가방",
    price: 25000,
    imageUrl: "https://example.com/bag.jpg",
    category: "패션잡화",
  },
];

const mockCartItems = [
  {
    id: 101,
    quantity: 1,
    product: {
      id: 1,
      name: "사과",
      price: 2000,
      imageUrl: "https://example.com/apple.jpg",
      category: "식료품",
    },
  },
];

describe("App 컴포넌트", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockProductListApi.mockResolvedValue(mockProducts);
    mockCartItemListApi.mockResolvedValue(mockCartItems);
    mockAddProductItemApi.mockResolvedValue(undefined);
    mockRemoveProductItemApi.mockResolvedValue(undefined);
  });

  test("초기 로딩 시 로딩 스피너가 표시되어야 한다", () => {
    render(<App />);
    expect(screen.getByAltText("로딩 스피너 아이콘")).toBeTruthy();
  });

  test("상품 목록이 로드되면 로딩 스피너가 사라져야 한다", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.queryByAltText("로딩 스피너 아이콘")).toBeNull();
    });
  });

  test("상품 목록이 로드되면 상품 항목이 표시되어야 한다", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.queryByAltText("로딩 스피너 아이콘")).toBeNull();
    });

    expect(screen.getByText("사과")).toBeTruthy();
    expect(screen.getByText("바나나")).toBeTruthy();
    expect(screen.getByText("모자")).toBeTruthy();
    expect(screen.getByText("가방")).toBeTruthy();
  });

  test("카테고리 필터링이 작동한다", async () => {
    mockProductListApi.mockImplementation(({ category }) => {
      if (category === "식료품") {
        return Promise.resolve([
          {
            id: 1,
            name: "사과",
            price: 2000,
            imageUrl: "https://example.com/apple.jpg",
            category: "식료품",
          },
          {
            id: 2,
            name: "바나나",
            price: 3000,
            imageUrl: "https://example.com/banana.jpg",
            category: "식료품",
          },
        ]);
      } else if (category === "패션잡화") {
        return Promise.resolve([
          {
            id: 3,
            name: "모자",
            price: 15000,
            imageUrl: "https://example.com/hat.jpg",
            category: "패션잡화",
          },
          {
            id: 4,
            name: "가방",
            price: 25000,
            imageUrl: "https://example.com/bag.jpg",
            category: "패션잡화",
          },
        ]);
      } else {
        return Promise.resolve(mockProducts);
      }
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.queryByAltText("로딩 스피너 아이콘")).toBeNull();
    });

    const categorySelect = screen.getAllByRole("combobox")[0];

    fireEvent.change(categorySelect, { target: { value: "식료품" } });

    await waitFor(() => {
      expect(screen.getByText("사과")).toBeTruthy();
      expect(screen.getByText("바나나")).toBeTruthy();

      expect(screen.queryByText("모자")).toBeNull();
      expect(screen.queryByText("가방")).toBeNull();
    });
  });

  test("가격순 정렬이 작동한다", async () => {
    mockProductListApi.mockImplementation(({ sort }) => {
      const products = [...mockProducts];

      if (sort === "price,asc") {
        return Promise.resolve(products.sort((a, b) => a.price - b.price));
      } else if (sort === "price,desc") {
        return Promise.resolve(products.sort((a, b) => b.price - a.price));
      } else {
        return Promise.resolve(products);
      }
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.queryByAltText("로딩 스피너 아이콘")).toBeNull();
    });

    const sortSelect = screen.getAllByRole("combobox")[1];

    fireEvent.change(sortSelect, { target: { value: "price,asc" } });

    await waitFor(() => {
      const productElements = screen.getAllByText(/[0-9,]+원/);
      expect(productElements[0].textContent).toBe("2,000원");
    });

    fireEvent.change(sortSelect, { target: { value: "price,desc" } });

    await waitFor(() => {
      const productElements = screen.getAllByText(/[0-9,]+원/);
      expect(productElements[0].textContent).toBe("25,000원");
    });
  });

  test("상품을 장바구니에 담을 수 있다", async () => {
    const updatedCartItems = [
      ...mockCartItems,
      {
        id: 102,
        quantity: 1,
        product: {
          id: 2,
          name: "바나나",
          price: 3000,
          imageUrl: "https://example.com/banana.jpg",
          category: "식료품",
        },
      },
    ];

    mockCartItemListApi
      .mockImplementationOnce(() => Promise.resolve(mockCartItems))
      .mockImplementationOnce(() => Promise.resolve(updatedCartItems));

    render(<App />);

    await waitFor(() => {
      expect(screen.queryByAltText("로딩 스피너 아이콘")).toBeNull();
    });

    const addButton = screen.getAllByText("담기")[0];

    fireEvent.click(addButton);

    expect(mockAddProductItemApi).toHaveBeenCalled();

    await waitFor(() => {
      const badge = screen.getByText("2");
      expect(badge).toBeTruthy();
    });
  });

  test("장바구니에서 상품을 제거할 수 있다", async () => {
    mockCartItemListApi
      .mockImplementationOnce(() => Promise.resolve(mockCartItems))
      .mockImplementationOnce(() => Promise.resolve([]));

    render(<App />);

    await waitFor(() => {
      expect(screen.queryByAltText("로딩 스피너 아이콘")).toBeNull();
    });

    const removeButton = screen.getByText("삭제");

    fireEvent.click(removeButton);

    expect(mockRemoveProductItemApi).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.queryByText("1")).toBeNull();
    });
  });

  test("장바구니에 담긴 아이템이 50개를 초과하면 에러 메시지가 표시된다", async () => {
    mockAddProductItemApi.mockRejectedValueOnce(
      new Error("장바구니에는 최대 50개의 상품만 담을 수 있습니다.")
    );

    render(<App />);

    await waitFor(() => {
      expect(screen.queryByAltText("로딩 스피너 아이콘")).toBeNull();
    });

    const addButton = screen.getAllByText("담기")[0];

    fireEvent.click(addButton);

    await waitFor(() => {
      const errorMessage = screen.getByText(
        "장바구니에는 최대 50개의 상품만 담을 수 있습니다."
      );
      expect(errorMessage).toBeTruthy();
    });
  });

  test("API 에러가 발생하면 에러 메시지가 표시된다", async () => {
    vi.clearAllMocks();
    mockProductListApi.mockRejectedValueOnce(
      new Error("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.")
    );

    render(<App />);

    await waitFor(() => {
      const errorMessage = screen.getByText(
        "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
      );
      expect(errorMessage).toBeTruthy();
    });
  });
});
