import { render, screen, fireEvent } from "@testing-library/react";
import * as productApi from "../src/api/getProducts";
import { vi, describe, it, afterEach } from "vitest";
import ProductListContainer from "../src/Component/Product/ProductListContainer";
import { MOCK_PRODUCTS } from "./Constants";
import React from "react";
import { APIProvider } from "../src/domain/contexts/APIContext";
import QuantityController from "../src/Component/Common/QuantityController";
import deleteShoppingCart from "../src/api/deleteShoppingCart";
import patchShoppingCart from "../src/api/patchShoppingCart";

describe("ProductListContainer", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it("상품 목록을 성공적으로 렌더링한다", async () => {
    vi.spyOn(productApi, "default").mockResolvedValue({
      content: MOCK_PRODUCTS,
    });

    render(
      <APIProvider>
        <ProductListContainer />
      </APIProvider>
    );

    for (const p of MOCK_PRODUCTS) {
      expect(await screen.findByText(p.name)).toBeInTheDocument();
      expect(
        screen.getByText(p.price.toLocaleString("ko") + "원")
      ).toBeInTheDocument();
    }
  });

  describe("QuantityController", () => {
    const mockRefetch = vi.fn();

    beforeEach(() => {
      vi.clearAllMocks();
    });

    it("수량이 1일 때 감소 버튼 클릭 시 deleteShoppingCart 호출", async () => {
      render(
        <QuantityController productId={1} count={1} refetch={mockRefetch} />
      );

      fireEvent.click(screen.getByTestId("remove-btn-1"));

      expect(deleteShoppingCart).toHaveBeenCalledWith(1);
      expect(mockRefetch).toHaveBeenCalled();
    });

    it("수량이 2일 때 감소 버튼 클릭 시 patchShoppingCart 호출", async () => {
      render(
        <QuantityController productId={1} count={2} refetch={mockRefetch} />
      );

      fireEvent.click(screen.getByTestId("remove-btn-1"));

      expect(patchShoppingCart).toHaveBeenCalledWith(1, 1);
      expect(mockRefetch).toHaveBeenCalled();
    });

    it("증가 버튼 클릭 시 patchShoppingCart 호출", async () => {
      render(
        <QuantityController productId={1} count={2} refetch={mockRefetch} />
      );

      fireEvent.click(screen.getByAltText("increaseItemButtonIcon"));

      expect(patchShoppingCart).toHaveBeenCalledWith(1, 3);
      expect(mockRefetch).toHaveBeenCalled();
    });
  });
});
