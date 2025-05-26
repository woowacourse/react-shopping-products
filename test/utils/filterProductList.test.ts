import { describe, expect, it } from "vitest";
import { Product } from "../../src/types";
import filterProductList from "..//utils/filterProductList";

describe("filterProductList 유틸 함수 테스트", () => {
	it("상품 목록을 식료품 카테고리로 필터링하여 상품 목록을 반환한다.", () => {
		const products: Product[] = [
			{ id: 1, name: "첫째", price: 7000, imageUrl: "", category: "식료품", quantity: 1 },
			{ id: 2, name: "둘째", price: 3000, imageUrl: "", category: "패션잡화", quantity: 2 },
			{ id: 3, name: "셋째", price: 5000, imageUrl: "", category: "식료품", quantity: 3 },
		];
		expect(filterProductList(products, "식료품")).toEqual([
			{ id: 1, name: "첫째", price: 7000, imageUrl: "", category: "식료품", quantity: 1 },
			{ id: 3, name: "셋째", price: 5000, imageUrl: "", category: "식료품", quantity: 3 },
		]);
	});

	it("상품 목록을 패션잡화 카테고리로 필터링하여 상품 목록을 반환한다.", () => {
		const products: Product[] = [
			{ id: 1, name: "첫째", price: 7000, imageUrl: "", category: "패션잡화", quantity: 1 },
			{ id: 2, name: "둘째", price: 3000, imageUrl: "", category: "식료품", quantity: 2 },
			{ id: 3, name: "셋째", price: 5000, imageUrl: "", category: "패션잡화", quantity: 3 },
		];

		expect(filterProductList(products, "패션잡화")).toEqual([
			{ id: 1, name: "첫째", price: 7000, imageUrl: "", category: "패션잡화", quantity: 1 },
			{ id: 3, name: "셋째", price: 5000, imageUrl: "", category: "패션잡화", quantity: 3 },
		]);
	});
});
