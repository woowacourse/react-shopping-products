import { PRODUCT_URL } from "../constants/endpoint";
import { USER_TOKEN } from "../constants/env";
import { useFetch } from "./useFetch";
import getQueryURL from "../utils/getQueryURL";
import { Product } from "../types";

interface UseProductsProps {
	page?: string;
	size?: string;
	filterType?: string;
	sortingType?: string;
}

export default function useProducts({ page = "0", size = "20", filterType, sortingType }: UseProductsProps = {}) {
	const query = {
		page,
		size,
		...(sortingType && { sort: `price,${sortingType}` }),
		...(filterType && { category: filterType }),
	};
	const url = getQueryURL(PRODUCT_URL, query);

	const {
		data: products,
		loading,
		error: productError,
		refetch: fetchProducts,
	} = useFetch<Product[]>({
		url,
		headers: {
			"content-type": "application/json",
			Authorization: `Basic ${USER_TOKEN}`,
		},
	});

	return { products, loading, productError, fetchProducts };
}
