import { http, HttpResponse } from "msw";
import products from "./products.json";
import { PRODUCT_URL } from "../constants/endpoint";

export const handlers = [
	http.get(PRODUCT_URL, () => {
		return HttpResponse.json(products);
	}),
];
