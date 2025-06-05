// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { expect, describe, it } from "vitest";
import { ToastProvider } from "../provider/ToastProvider";
import { DataProvider } from "../provider/DataProvider";
import ProductContainer from "../components/productContainer/ProductContainer";

describe("ProductCardList 컴포넌트", () => {
  it("상품 데이터를 받아오면 상품 목록을 렌더링한다", async () => {
    render(
      <DataProvider>
        <ToastProvider>
          <ProductContainer />
        </ToastProvider>
      </DataProvider>
    );

    const productNames = await screen.findAllByRole("heading", { level: 3 });
    expect(productNames).toHaveLength(16);

    expect(screen.getByText("망고")).toBeInTheDocument();
    expect(screen.getByText("12,510원")).toBeInTheDocument();
  });
});
