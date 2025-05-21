import { renderHook, waitFor, act } from "@testing-library/react";
import { server } from "../../src/mocks/server";
import { http, HttpResponse } from "msw";
import { PRODUCT_URL } from "../../src/constants/endpoint";
import useProducts from "../../src/hooks/useProducts";
import products from "../../src/mocks/data/products.json";
import sortProductList from "../utils/sortProductList";
import filterProductList from "../utils/filterProductList";

describe("useProducts", () => {
	it("가장 앞 상품 목록을 조회한다.", async () => {
		server.use(
			http.get(PRODUCT_URL, () => {
				return HttpResponse.json({ content: products });
			})
		);

		const { result } = renderHook(() => useProducts());

		await waitFor(() => {
			expect(result.current.products).toEqual(products);
		});
	});

	it("상품 목록을 '식료품'으로 필터링하여 조회한다.", async () => {
		const FILTER_TYPE = "식료품";
		const filteredProducts = filterProductList(products, FILTER_TYPE);

		server.use(
			http.get(PRODUCT_URL, () => {
				return HttpResponse.json({ content: filteredProducts });
			})
		);

		const { result } = renderHook(() => useProducts());

		act(() => {
			result.current.setFilter(FILTER_TYPE);
		});

		await waitFor(() => {
			expect(result.current.products).toEqual(filteredProducts);
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
