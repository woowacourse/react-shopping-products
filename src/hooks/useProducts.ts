import { PRODUCT_URL } from "../constants/endpoint";
import getQueryURL from "../utils/getQueryURL";
import { FilterType, Product, SortType } from "../types";
import { useState, useEffect } from "react";
import fetchData from "../utils/api/fetchData";

interface UseProductsProps {
	page?: string;
	size?: string;
}

export default function useProducts({ page = "0", size = "20" }: UseProductsProps = {}) {
	const [filter, setFilter] = useState<FilterType>("");
	const [sort, setSort] = useState<SortType>("asc");
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
