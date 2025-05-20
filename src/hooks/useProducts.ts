import { useState, useEffect } from "react";
import { Info } from "../types";
import { PRODUCT_URL } from "../constants/endpoint";
import getQueryURL from "../utils/getQueryURL";
import handleHttpError from "../utils/handleHTTPError";

export default function useProducts({ page = "0", size = "20", sortingType = "", filterType = "" }) {
	const [productsInfo, setProductsInfo] = useState<Info>({ content: [] });
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");

	const products = productsInfo.content;
	const query = {
		page,
		size,
		...(sortingType && { sort: `price,${sortingType}` }),
		...(filterType && { category: filterType }),
	};
	const requestURL = getQueryURL(PRODUCT_URL, query);

	const fetchProducts = async () => {
		try {
			setLoading(true);
			const response = await fetch(requestURL);
			handleHttpError(response);
			const data = await response.json();
			setProductsInfo(data);
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message);
			}
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, [requestURL]);

	return { products, loading, fetchProducts, productError: error };
}
