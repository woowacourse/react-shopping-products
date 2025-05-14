import { Category } from '../App';

type PriceOrder = '낮은 가격순' | '높은 가격순';
type GetProductsProps = {
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
  let newErrorMessage = '';

  if (category !== '전체') searchParams.append('category', category);
  if (priceOrder)
    searchParams.append('sort', priceOrderQueryString[priceOrder]);

  const queryString = searchParams.toString();
  const baseUrl =
    'http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com/products';
  const url = queryString ? `${baseUrl}?${queryString}` : baseUrl;

  const response = await fetch(url, { method: 'GET' });

  if (!response.ok)
    newErrorMessage = '상품을 불러오는 데 실패했습니다. 다시 시도해주세요.';

  const data = await response.json();
  return { newErrorMessage, data };
};

export default getProducts;
