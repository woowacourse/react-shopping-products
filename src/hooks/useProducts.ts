import { PRODUCT_URL } from "../constants/endpoint";
import getQueryURL from "../utils/getQueryURL";
import { filterType, Product, sortingType } from "../types";
import { useState, useEffect } from "react";
import fetchData from "../utils/api/fetchData";

interface UseProductsProps {
	page?: string;
	size?: string;
	filterType?: string;
	sortingType?: string;
}

export default function useProducts({ page = "0", size = "20" }: UseProductsProps = {}) {
	const [filter, setFilter] = useState<filterType>("");
	const [sort, setSort] = useState<sortingType>("asc");
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [productError, setProductError] = useState<string>("");

	const query = {
		page,
		size,
		...(sort && { sort: `price,${sort}` }),
		...(filter && { category: filter }),
	};
	const url = getQueryURL(PRODUCT_URL, query);

	const fetchProducts = async () => {
		try {
			setLoading(true);
			const data = await fetchData({ url });
			setProducts(data);
		} catch (error) {
			if (error instanceof Error) {
				setProductError(error.message);
			}
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, [url]);

	return { products, loading, filter, setFilter, sort, setSort, productError };
}
