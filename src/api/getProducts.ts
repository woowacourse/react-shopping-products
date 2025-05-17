import { Category } from '../App';
import safeFetch from './safeFetch';

export type PriceOrder = '낮은 가격순' | '높은 가격순';
export type GetProductsProps = {
  category?: Category;
  priceOrder?: PriceOrder;
};
const priceOrderQueryString = {
  '낮은 가격순': 'price%2Casc',
  '높은 가격순': 'price%2Cdesc',
};

const getProducts = async ({
  category = '전체',
  priceOrder = '낮은 가격순',
}: GetProductsProps = {}) => {
  const searchParams = new URLSearchParams();
  searchParams.toString();

  if (category !== '전체') searchParams.append('category', category);
  if (priceOrder)
    searchParams.append('sort', priceOrderQueryString[priceOrder]);

  const queryString = searchParams.toString();
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
