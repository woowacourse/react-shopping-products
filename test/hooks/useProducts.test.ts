import { renderHook, waitFor, act } from "@testing-library/react";
import { server } from "../../src/mocks/server";
import { http, HttpResponse } from "msw";
import { PRODUCT_URL } from "../../src/constants/endpoint";
import useProducts from "../../src/hooks/useProducts";
import products from "../../src/mocks/data/products.json";
import sortProductList from "../utils/sortProductList";
import filterProductList from "../utils/filterProductList";

describe("useProducts", () => {
	describe("상품 목록 조회", () => {
		it("가장 앞 상품 목록을 조회한다.", async () => {
			const { result } = renderHook(() => useProducts());

			await waitFor(() => {
				expect(result.current.products).toHaveLength(products.length);
			});
		});

		it("상품 목록을 '식료품'으로 필터링하여 조회한다.", async () => {
			const FILTER_TYPE = "식료품";
			const filteredProducts = filterProductList(products, FILTER_TYPE);

			server.use(
				http.get(PRODUCT_URL, ({ request }) => {
					const url = new URL(request.url);
					const category = url.searchParams.get("category");

					if (category === FILTER_TYPE) {
						return HttpResponse.json(filteredProducts);
					}

					return HttpResponse.json(products);
				})
			);

			const { result, rerender } = renderHook(() => useProducts());

			// 필터 적용
			act(() => {
				result.current.setFilter(FILTER_TYPE);
			});

			// 상태 변경 후 rerender 필요
			rerender();

			await waitFor(() => {
				expect(result.current.products.every((p) => p.category === FILTER_TYPE)).toBe(true);
			});
		});

		it("가장 앞 상품 목록을 오름차순으로 정렬하여 조회한다.", async () => {
			const { result } = renderHook(() => useProducts({}));

			act(() => {
				result.current.setSort("asc");
			});

			await waitFor(() => {
				const sortedProducts = sortProductList(products, "asc");
				expect(result.current.products).toEqual(sortedProducts);
			});
		});
	});
});
