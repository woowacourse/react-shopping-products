import { http, HttpResponse } from "msw";
import products from "./data/products.json";
import cart from "./data/cart.json";
import { CART_URL, PRODUCT_URL } from "../constants/endpoint";
import filterProductList from "../utils/filterProductList";
import sortProductList from "../utils/sortProductList";
import { FilterType, SortType } from "../types";

export const handlers = [
	http.get(PRODUCT_URL, ({ request }) => {
		const url = new URL(request.url);
		const category = url.searchParams.get("category") as FilterType;
		const sort = url.searchParams.get("sort");

		let resultProducts = products;
		if (category) resultProducts = filterProductList(products, category);
		if (sort) resultProducts = sortProductList(products, sort.split(",")[1] as SortType);

		return HttpResponse.json({ content: resultProducts });
	}),

	http.get(CART_URL, () => {
		return HttpResponse.json({ content: cart });
	}),

	http.post(CART_URL, async ({ request }) => {
		const body = await request.json();
		const { productId, quantity } = body as { productId: number; quantity: number };

		if (!productId || quantity < 1) {
			return HttpResponse.error();
		}

		return HttpResponse.json({ ok: true }, { status: 201 });
	}),

	http.delete(`${CART_URL}/:id`, async () => {
		return HttpResponse.json({ ok: true }, { status: 201 });
	}),
];
