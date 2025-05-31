import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import ProductListContainer from "../components/product/ProductListContainer/ProductListContainer";
import { ApiProvider } from "../context/ApiContext/ApiContext";
import { ToastProvider } from "../context/ToastContext/ToastContext";
import { allProductsData } from "../mocks/data/mockProducts";

let mockAllProductsData = allProductsData;

describe("ProductListContainer 컴포넌트", () => {
  beforeEach(() => {
    mockAllProductsData = allProductsData;
  });

  it("상품 목록이 성공적으로 렌더링된다", async () => {
    render(
      <ToastProvider>
        <ApiProvider>
          <ProductListContainer />
        </ApiProvider>
      </ToastProvider>
    );

    await waitFor(async () => {
      const expectedAllProducts = mockAllProductsData.map(
        (product) => product.name
      );

      expectedAllProducts.forEach((texts) => {
        expect(screen.getByText(texts)).toBeInTheDocument();
      });
    });
  });

  it("카테고리를 식료품으로 변경 시 fetchProductList 재호출된다", async () => {
    render(
      <ToastProvider>
        <ApiProvider>
          <ProductListContainer />
        </ApiProvider>
      </ToastProvider>
    );

    const selects = screen.getAllByRole("combobox");
    const categorySelect = selects[0];

    fireEvent.change(categorySelect, { target: { value: "식료품" } });

    await waitFor(() => {
      const filteredProducts = mockAllProductsData.filter(
        (product) => product.category === "식료품"
      );
      filteredProducts.forEach((product) => {
        expect(screen.getByText(product.name)).toBeInTheDocument();
      });
    });
  });

  it("카테고리를 패션잡화로 변경 시 해당 상품들이 보인다.", async () => {
    render(
      <ToastProvider>
        <ApiProvider>
          <ProductListContainer />
        </ApiProvider>
      </ToastProvider>
    );

    const selects = screen.getAllByRole("combobox");
    const categorySelect = selects[0];

    fireEvent.change(categorySelect, { target: { value: "패션잡화" } });

    await waitFor(() => {
      const filteredProducts = mockAllProductsData.filter(
        (product) => product.category === "패션잡화"
      );
      filteredProducts.forEach((product) => {
        expect(screen.getByText(product.name)).toBeInTheDocument();
      });
    });
  });

  it("정렬 기준을 가격 내림차순으로 변경 시 fetchProductList 재호출된다", async () => {
    render(
      <ToastProvider>
        <ApiProvider>
          <ProductListContainer />
        </ApiProvider>
      </ToastProvider>
    );

    const selects = screen.getAllByRole("combobox");
    const sortSelect = selects[1];

    fireEvent.change(sortSelect, { target: { value: "price,desc" } });

    const expectedOrder = [
      "앵그리버드",
      "달 무드등",
      "후추",
      "동물 양말",
      "얌샘김밥",
      "아바라",
      "아샷추",
      "코카콜라 제로 1.5L",
      "프린세스 미용놀이",
      "20",
      "19",
      "17",
      "16",
      "14",
      "13",
      "12",
      "11",
      "10",
      "9",
      "8888",
    ];

    await waitFor(async () => {
      const items = await screen.findAllByRole("listitem");
      const actualTexts = items.map((item) => item.textContent);
      expectedOrder.forEach(async (expected) => {
        expect(await screen.findByText(expected)).toBeInTheDocument();
      });

      expectedOrder.forEach((expected, index) => {
        expect(actualTexts[index]).toContain(expected);
      });
    });
  });
});
