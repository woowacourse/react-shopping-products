import { renderHook, waitFor, act } from "@testing-library/react";
import useProducts from "../../src/hooks/useProducts";
import products from "../../src/mocks/data/products.json";
import sortProductList from "../utils/sortProductList";
import filterProductList from "../utils/filterProductList";
import { server } from "../../src/mocks/server";
import { http, HttpResponse } from "msw";
import { PRODUCT_URL } from "../../src/constants/endpoint";

describe("useProducts", () => {
	describe("상품 목록 조회", () => {
		it("가장 앞 상품 목록을 조회한다.", async () => {
			const { result } = renderHook(() => useProducts({}));

			await waitFor(() => {
				expect(result.current.products).toHaveLength(products.length);
			});
		});

		it("가장 앞 상품 목록을 식료품으로 필터링하여 조회한다.", async () => {
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

			const { result } = renderHook(() => useProducts({}));

			act(() => {
				result.current.setFilter(FILTER_TYPE);
			});

			await waitFor(() => {
				const filteredProducts = result.current.products.every((product) => product.category === FILTER_TYPE);
				expect(filteredProducts).toBe(true);
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
