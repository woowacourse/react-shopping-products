import { FilterType, Product } from "../../src/types";

const filterProductList = (productList: Product[], filterType: FilterType) => {
	return productList.filter((product) => product.category === filterType);
};

export default filterProductList;
