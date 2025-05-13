import { Product, SortingType } from "../types";

const sortProductList = (productList: Product[], sortingType: SortingType) => {
	if (sortingType === "ASC") return [...productList].sort((a, b) => a.price - b.price);
	if (sortingType === "DESC") return [...productList].sort((a, b) => b.price - a.price);
};

export default sortProductList;
