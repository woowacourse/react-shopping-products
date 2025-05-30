import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ProductCardList from "../components/productCardList/ProductCardList";
import { ProductPageResponse } from "../types/response.types";
import { useCartProduct } from "../hooks/useCartProduct";
import { CartProductContextType } from "../hooks/useCartProduct";

vi.mock("../hooks/useData");

const mockedUseData =
  useCartProduct as unknown as jest.Mock<CartProductContextType>;

describe("ProductCardList 컴포넌트", () => {
  const setErrorTrue = vi.fn();

  it("20개의 상품을 렌더링해야 한다", async () => {
    const mockedProducts: ProductPageResponse = {
      content: Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        name: `상품 ${i + 1}`,
        price: 10000,
        imageUrl: "",
        category: "식료품",
        quantity: 10,
      })),
      totalPages: 1,
      size: 20,
    };

    mockedUseData.mockReturnValue({
      products: mockedProducts,
      isLoading: false,
      cartItemIds: [],
      fetchCartProducts: vi.fn(),
      fetchProducts: vi.fn(),
      setCartItemIds: vi.fn(),
    });

    render(<ProductCardList setErrorTrue={setErrorTrue} />);

    const headings = await screen.findAllByRole("heading", { level: 3 });
    expect(headings).toHaveLength(20);
  });

  it("낮은 가격순으로 정렬된 데이터를 그대로 렌더링해야 한다", async () => {
    const sortedProducts: ProductPageResponse = {
      content: [
        {
          id: 1,
          name: "상품1",
          price: 1000,
          imageUrl: "",
          category: "식료품",
          quantity: 10,
        },
        {
          id: 2,
          name: "상품2",
          price: 2000,
          imageUrl: "",
          category: "식료품",
          quantity: 10,
        },
        {
          id: 3,
          name: "상품3",
          price: 3000,
          imageUrl: "",
          category: "식료품",
          quantity: 10,
        },
      ],
      totalPages: 1,
      size: 3,
    };

    mockedUseData.mockReturnValue({
      products: sortedProducts,
      isLoading: false,
      cartItemIds: [],
      fetchCartProducts: vi.fn(),
      fetchProducts: vi.fn(),
      setCartItemIds: vi.fn(),
    });

    render(<ProductCardList setErrorTrue={setErrorTrue} />);

    const prices = await screen.findAllByText(/원$/);
    const numbers = prices.map((el) =>
      Number(el.textContent?.replace(/[^\d]/g, ""))
    );
    expect(numbers).toEqual([1000, 2000, 3000]);
  });

  it("같은 가격의 상품이 이름순으로 정렬된 데이터를 렌더링해야 한다", async () => {
    const sortedByName: ProductPageResponse = {
      content: [
        {
          id: 1,
          name: "감자",
          price: 10000,
          imageUrl: "",
          category: "식료품",
          quantity: 10,
        },
        {
          id: 2,
          name: "사과",
          price: 10000,
          imageUrl: "",
          category: "식료품",
          quantity: 10,
        },
        {
          id: 3,
          name: "호박",
          price: 10000,
          imageUrl: "",
          category: "식료품",
          quantity: 10,
        },
      ],
      totalPages: 1,
      size: 3,
    };

    mockedUseData.mockReturnValue({
      products: sortedByName,
      isLoading: false,
      cartItemIds: [],
      fetchCartProducts: vi.fn(),
      fetchProducts: vi.fn(),
      setCartItemIds: vi.fn(),
    });

    render(<ProductCardList setErrorTrue={setErrorTrue} />);

    const names = await screen.findAllByRole("heading", { level: 3 });
    const result = names.map((el) => el.textContent);
    expect(result).toEqual(["감자", "사과", "호박"]);
  });

  it("로딩 중일 때 Skeleton UI가 렌더링되어야 한다", () => {
    mockedUseData.mockReturnValue({
      products: null,
      isLoading: true,
      cartItemIds: [],
      fetchCartProducts: vi.fn(),
      fetchProducts: vi.fn(),
      setCartItemIds: vi.fn(),
    });

    render(<ProductCardList setErrorTrue={setErrorTrue} />);
    expect(screen.getByTestId("product-skeleton")).toBeInTheDocument();
  });

  it("상품 수량이 0이면 품절 UI가 표시되어야 한다", async () => {
    const soldOutProduct: ProductPageResponse = {
      content: [
        {
          id: 1,
          name: "품절상품",
          price: 10000,
          imageUrl: "",
          category: "식료품",
          quantity: 0,
        },
      ],
      totalPages: 1,
      size: 1,
    };

    mockedUseData.mockReturnValue({
      products: soldOutProduct,
      isLoading: false,
      cartItemIds: [],
      fetchCartProducts: vi.fn(),
      fetchProducts: vi.fn(),
      setCartItemIds: vi.fn(),
    });

    render(<ProductCardList setErrorTrue={setErrorTrue} />);

    const soldOutText = await screen.findByText("품절");
    expect(soldOutText).toBeInTheDocument();
  });
});
