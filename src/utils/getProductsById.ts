import { Product } from '../types';

const getProductsById = (products: Product[], id: number) => {
  return products.filter((product) => product.id === id);
};

export default getProductsById;
