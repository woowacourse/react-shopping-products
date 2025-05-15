import { http, HttpResponse } from "msw";
import products from "./data/products.json";
import cart from "./data/cart.json";
import { CART_URL, PRODUCT_URL } from "../constants/endpoint";
import filterProductList from "../utils/filterProductList";
import sortProductList from "../utils/sortProductList";
import { filterType, SortingType } from "../types";

export const handlers = [
	http.get(PRODUCT_URL, ({ request }) => {
		const url = new URL(request.url);
		const category = url.searchParams.get("category") as filterType;
		const sort = url.searchParams.get("sort");

		let resultProducts = products;
		if (category) resultProducts = filterProductList(products, category);
		if (sort) resultProducts = sortProductList(products, sort.split(",")[1] as SortingType);

		return HttpResponse.json({ content: resultProducts });
	}),

	http.get(CART_URL, () => {
		return HttpResponse.json({ content: cart });
	}),
];
