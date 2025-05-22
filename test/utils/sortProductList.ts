import { Product, SortType } from "../../src/types";

const sortProductList = (productList: Product[], SortType: SortType) => {
	if (SortType === "asc") return [...productList].sort((a, b) => a.price - b.price);
	if (SortType === "desc") return [...productList].sort((a, b) => b.price - a.price);
	return [...productList];
};

export default sortProductList;
