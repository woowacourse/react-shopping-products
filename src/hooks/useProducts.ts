import { useState, useEffect } from "react";
import { Product } from "../types";
import { PRODUCT_URL } from "../constants/endpoint";
import getQueryURL from "../utils/getQueryURL";

export default function useProducts({ page = "0", size = "20", sortingType = "", filterType = "" }) {
	const [products, setProducts] = useState<Product[]>([]);
	const query = {
		page,
		size,
		...(sortingType && { sort: `price,${sortingType}` }),
		...(filterType && { category: filterType }),
	};
	const requestURL = getQueryURL(PRODUCT_URL, query);

	useEffect(() => {
		const fetchProducts = async () => {
			const response = await fetch(requestURL);
			const data = await response.json();

			setProducts(data);
		};

		fetchProducts();
	}, []);

	return { products };
}
