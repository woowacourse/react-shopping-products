import { act, renderHook, waitFor } from "@testing-library/react";
import useCart from "../../src/hooks/useCart";
import { getCartState } from "../../src/mocks/handlers/cartHandler";

describe("useCart", () => {
	it("장바구니에 등록된 아이템 목록을 조회한다.", async () => {
		const { result } = renderHook(() => useCart());

		await waitFor(() => {
			expect(result.current.cartProducts).toEqual(getCartState());
		});
	});

	it("장바구니에 아이템을 등록한다.", async () => {
		const { result } = renderHook(() => useCart());

		act(() => {
			result.current.updateCartItem("add", 20);
		});

		await waitFor(() => {
			expect(result.current.cartProducts).toEqual(getCartState());
		});
	});

	it("장바구니에 등록된 아이템을 제거한다.", async () => {
		const { result } = renderHook(() => useCart());

		act(() => {
			result.current.updateCartItem("remove", 1);
		});

		await waitFor(() => {
			expect(result.current.cartProducts).toEqual(getCartState());
		});
	});
});
