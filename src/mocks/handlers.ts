import { http, HttpResponse } from "msw";
import products from "./products.json";
import cart from "./cart.json";
import { CART_URL, PRODUCT_URL } from "../constants/endpoint";

export const handlers = [
	http.get(PRODUCT_URL, () => {
		return HttpResponse.json(products);
	}),

	http.get(CART_URL, () => {
		return HttpResponse.json(cart);
	}),
];
