import { PRODUCT_URL } from "../constants/endpoint";
import { FilterType, SortType } from "../types";
import { useData } from "../components/Context/DataContext";
import { useEffect, useState } from "react";
import fetchData from "../utils/api/fetchData";
import getQueryURL from "../utils/getQueryURL";

export const useProducts = () => {
	const [filter, setFilter] = useState<FilterType>("");
	const [sort, setSort] = useState<SortType>("asc");
	const query = {
		page: "0",
		size: "20",
		...(sort && { sort: `price,${sort}` }),
		...(filter && { category: filter }),
	};
	const url = getQueryURL(PRODUCT_URL, query);

	const {
		data: products,
		refetch,
		loading,
		setLoading,
	} = useData({
		fetcher: () =>
			fetchData({
				url,
			}),
		name: "products",
	});

	useEffect(() => {
		setLoading(true);
		refetch();
		setLoading(false);
	}, [url]);

	return {
		products: products || [],
		loading,
		filter,
		setFilter,
		sort,
		setSort,
	};
};
