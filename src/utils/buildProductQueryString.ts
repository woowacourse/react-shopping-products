import { Category, PriceOrder } from '../App';

const priceOrderQueryString = {
  '낮은 가격순': 'price%2Casc',
  '높은 가격순': 'price%2Cdesc',
};
export const buildProductQueryString = ({
  category = '전체',
  priceOrder = '낮은 가격순',
}: {
  category?: Category;
  priceOrder?: PriceOrder;
} = {}) => {
  const searchParams = new URLSearchParams();

  if (category !== '전체') searchParams.append('category', category);
  if (priceOrder)
    searchParams.append('sort', priceOrderQueryString[priceOrder]);

  return searchParams.toString();
};
