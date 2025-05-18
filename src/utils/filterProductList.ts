import { filterType, Product } from '../types';

const filterProductList = (productList: Product[], filterType: filterType) => {
  return productList.filter((product) => product.category === filterType);
};

export default filterProductList;
