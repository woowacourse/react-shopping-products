import { useState, useEffect } from "react";
import { Info } from "../types";
import { PRODUCT_URL } from "../constants/endpoint";
import getQueryURL from "../utils/getQueryURL";

export default function useProducts({ page = "0", size = "20", sortingType = "", filterType = "" }) {
	const [productsInfo, setProductsInfo] = useState<Info>({ content: [] });
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<unknown>(null);

	const products = productsInfo.content;
	const query = {
		page,
		size,
		...(sortingType && { sort: `price,${sortingType}` }),
		...(filterType && { category: filterType }),
	};
	const requestURL = getQueryURL(PRODUCT_URL, query);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setLoading(true);
				const response = await fetch(requestURL);
				const data = await response.json();
				setProductsInfo(data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, [requestURL]);

	return { products, loading, error };
}
