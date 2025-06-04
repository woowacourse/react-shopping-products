import { render, screen, waitFor } from "@testing-library/react";
import App from "../src/App";
import * as getProductsModule from "../src/api/getProducts";
import * as getCartItemsModule from "../src/api/getCartItems";
import { vi } from "vitest";

vi.mock("../src/api/getProducts");
vi.mock("../src/api/getCartItems");
vi.mock("../src/api/postCartItems", () => ({
  default: vi.fn(),
}));

describe("App 컴포넌트 - API 흐름 테스트", () => {
  it("상품 목록을 응답 받아 상품명이 화면에 렌더링된다", async () => {
    (getProductsModule.default as ReturnType<typeof vi.fn>).mockResolvedValue({
      data: {
        content: [
          {
            id: 1,
            name: "테스트 상품",
            price: 1000,
            imageUrl: "",
            category: "식료품",
          },
        ],
      },
      newErrorMessage: "",
    });

    (getCartItemsModule.default as ReturnType<typeof vi.fn>).mockResolvedValue({
      data: { content: [] },
      newErrorMessage: "",
    });

    render(<App />);

    const productName = await screen.findByText("테스트 상품");
    expect(productName).toBeTruthy();
  });

  describe("정렬 기능 테스트", () => {
    const mockedGetProducts = getProductsModule.default as ReturnType<
      typeof vi.fn
    >;
    const mockedGetCartItems = getCartItemsModule.default as ReturnType<
      typeof vi.fn
    >;

    beforeEach(() => {
      mockedGetCartItems.mockResolvedValue({
        data: { content: [] },
        newErrorMessage: "",
      });
    });

    it("카테고리 전체 응답이면 모든 상품이 보인다", async () => {
      mockedGetProducts.mockResolvedValue({
        data: {
          content: [
            {
              id: 1,
              name: "사과",
              price: 1000,
              imageUrl: "",
              category: "식료품",
            },
            {
              id: 2,
              name: "가방",
              price: 2000,
              imageUrl: "",
              category: "패션잡화",
            },
          ],
        },
        newErrorMessage: "",
      });

      render(<App />);

      expect(await screen.findByText("사과")).toBeTruthy();
      expect(await screen.findByText("가방")).toBeTruthy();
    });

    it("카테고리 식료품 응답이면 식료품만 보인다", async () => {
      mockedGetProducts.mockResolvedValue({
        data: {
          content: [
            {
              id: 1,
              name: "사과",
              price: 1000,
              imageUrl: "",
              category: "식료품",
            },
          ],
        },
        newErrorMessage: "",
      });

      render(<App />);
      expect(await screen.findByText("사과")).toBeTruthy();
      expect(screen.queryByText("가방")).toBeNull();
    });

    it("카테고리 패션잡화 응답이면 패션잡화만 보인다", async () => {
      mockedGetProducts.mockResolvedValue({
        data: {
          content: [
            {
              id: 2,
              name: "가방",
              price: 2000,
              imageUrl: "",
              category: "패션잡화",
            },
          ],
        },
        newErrorMessage: "",
      });

      render(<App />);
      expect(await screen.findByText("가방")).toBeTruthy();
      expect(screen.queryByText("사과")).toBeNull();
    });

    it("낮은 가격순 응답이면 가격이 낮은 순서로 화면에 보인다", async () => {
      mockedGetProducts.mockResolvedValue({
        data: {
          content: [
            {
              id: 1,
              name: "사과",
              price: 1000,
              imageUrl: "",
              category: "식료품",
            },
            {
              id: 2,
              name: "딸기",
              price: 2000,
              imageUrl: "",
              category: "식료품",
            },
            {
              id: 3,
              name: "포도",
              price: 3000,
              imageUrl: "",
              category: "식료품",
            },
          ],
        },
        newErrorMessage: "",
      });

      render(<App />);
      await waitFor(() => {
        const priceElements = screen.getAllByText(/원$/);
        const prices = priceElements.map((el) =>
          parseInt(el.textContent!.replace(/,/g, "").replace("원", ""))
        );
        const sorted = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sorted);
      });
    });

    it("높은 가격순 응답이면 가격이 높은 순서로 화면에 보인다", async () => {
      mockedGetProducts.mockResolvedValue({
        data: {
          content: [
            {
              id: 1,
              name: "포도",
              price: 3000,
              imageUrl: "",
              category: "식료품",
            },
            {
              id: 2,
              name: "딸기",
              price: 2000,
              imageUrl: "",
              category: "식료품",
            },
            {
              id: 3,
              name: "사과",
              price: 1000,
              imageUrl: "",
              category: "식료품",
            },
          ],
        },
        newErrorMessage: "",
      });

      render(<App />);
      await waitFor(() => {
        const priceElements = screen.getAllByText(/원$/);
        const prices = priceElements.map((el) =>
          parseInt(el.textContent!.replace(/,/g, "").replace("원", ""))
        );
        const sorted = [...prices].sort((a, b) => b - a);
        expect(prices).toEqual(sorted);
      });
    });
  });

  describe("App 컴포넌트 - 장바구니 연동 테스트", () => {
    it("상품 목록 응답에 따라 Header에 장바구니 개수가 표시된다", async () => {
      (getProductsModule.default as ReturnType<typeof vi.fn>).mockResolvedValue(
        {
          data: {
            content: [
              {
                id: 1,
                name: "테스트 상품",
                price: 1000,
                imageUrl: "",
                category: "식료품",
              },
            ],
          },
          newErrorMessage: "",
        }
      );

      (
        getCartItemsModule.default as ReturnType<typeof vi.fn>
      ).mockResolvedValue({
        data: {
          content: [
            {
              id: 1,
              quantity: 1,
              product: {
                id: 1,
                name: "테스트 상품",
                price: 1000,
                imageUrl: "",
                category: "식료품",
              },
            },
            {
              id: 2,
              quantity: 1,
              product: {
                id: 2,
                name: "또다른 상품",
                price: 2000,
                imageUrl: "",
                category: "식료품",
              },
            },
          ],
        },
        newErrorMessage: "",
      });

      render(<App />);
      const cartCount = await screen.findByText("2");
      expect(cartCount).toBeTruthy();
    });
  });
});
