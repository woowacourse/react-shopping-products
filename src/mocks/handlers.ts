import { http, HttpResponse } from "msw";
import products from "./data/products.json";
import cart from "./data/cart.json";
import { CART_URL, PRODUCT_URL } from "../constants/endpoint";
import filterProductList from "../utils/filterProductList";
import { filterType } from "../types";

export const handlers = [
	http.get(PRODUCT_URL, ({ request }) => {
		const url = new URL(request.url);
		const category = url.searchParams.get("category") as filterType;
		if (category) return HttpResponse.json(filterProductList(products, category));

		return HttpResponse.json(products);
	}),

	http.get(CART_URL, () => {
		return HttpResponse.json(cart);
	}),
];
