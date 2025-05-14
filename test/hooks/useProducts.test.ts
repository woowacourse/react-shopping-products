import { renderHook, waitFor } from "@testing-library/react";
import useProducts from "../../src/hooks/useProducts";

describe("useProducts", () => {
	describe("상품 목록 조회", () => {
		it("가장 앞 상품 목록을 조회한다.", async () => {
			const { result } = renderHook(() => useProducts({}));

			await waitFor(() => {
				expect(result.current.products).toHaveLength(20);
			});
		});

		it("가장 앞 상품 목록을 식료품으로 필터링하여 조회한다..", async () => {
			const { result } = renderHook(() => useProducts({ filterType: "식료품" }));

			await waitFor(() => {
				expect(result.current.products).toHaveLength(10);
			});
		});
	});
});
