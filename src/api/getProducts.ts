import { Category } from '../App';
import { buildProductQueryString } from '../utils/buildProductQueryString';
import safeFetch from './safeFetch';

export type PriceOrder = '낮은 가격순' | '높은 가격순';
export type GetProductsProps = {
  category?: Category;
  priceOrder?: PriceOrder;
};

const getProducts = async ({
  category = '전체',
  priceOrder = '낮은 가격순',
}: GetProductsProps = {}) => {
  const queryString = buildProductQueryString({ category, priceOrder });

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { data, status } = await safeFetch(`products?${queryString}`, options);

  return { data, status };
};

export default getProducts;
