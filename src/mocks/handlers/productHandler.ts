import { delay, http, HttpResponse } from "msw";
import products from "../data/products.json";
import { PRODUCT_URL } from "../../constants/endpoint";
import filterProductList from "../../../test/utils/filterProductList";
import sortProductList from "../../../test/utils/sortProductList";
import { FilterType, SortType } from "../../types";

export const productHandler = [
	http.get(PRODUCT_URL, ({ request }) => {
		const url = new URL(request.url);

		const category = url.searchParams.get("category") as FilterType;
		const sort = url.searchParams.get("sort");

		let resultProducts = products;
		if (category) resultProducts = filterProductList(products, category);
		if (sort) resultProducts = sortProductList(resultProducts, sort.split(",")[1] as SortType);

		return HttpResponse.json({ content: resultProducts });
	}),

	http.all("*", async () => {
		await delay(100);
	}),
];
