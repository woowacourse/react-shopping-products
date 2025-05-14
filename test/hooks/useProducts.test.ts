import { renderHook, waitFor } from "@testing-library/react";
import useProducts from "../../src/hooks/useProducts";

describe("useProducts", () => {
	describe("상품 목록 조회", () => {
		it("가장 앞 페이상품 목록을 조회한다.", async () => {
			const { result } = renderHook(() => useProducts());

			await waitFor(() => {
				expect(result.current.products).toHaveLength(20);
			});
		});
	});
});
