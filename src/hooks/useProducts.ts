import { PRODUCT_URL } from "../constants/endpoint";
import { FilterType, SortType } from "../types";
import { useData } from "../components/Context/DataContext";
import { useEffect } from "react";
import fetchData from "../utils/api/fetchData";
import getQueryURL from "../utils/getQueryURL";

interface UseProductsParams {
	sort: SortType;
	filter: FilterType;
	size?: number;
	page?: number;
}

export const useProducts = ({ sort, filter, size = 20, page = 0 }: UseProductsParams) => {
	const query = {
		page: page.toString(),
		size: size.toString(),
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
		// filter,
		// setFilter,
		// sort,
		// setSort,
	};
};
