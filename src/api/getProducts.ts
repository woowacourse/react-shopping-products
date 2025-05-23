import { ProductResponse } from '../types/response';
import { OrderByOptionType } from '../types/categoryOption';
import { URLS } from '../constants/url';

const defaultSearchParams = {
  page: '0',
  size: '50'
};

const sortParams: Record<OrderByOptionType, string> = {
  '낮은 가격순': 'price,asc',
  '높은 가격순': 'price,desc'
};

const getProducts = (orderBy: OrderByOptionType): (() => Promise<ProductResponse>) => {
  return async () => {
    const url = new URL(URLS.PRODUCTS);
    const params = new URLSearchParams({
      ...defaultSearchParams,
      sort: sortParams[orderBy]
    });
    url.search = params.toString();

    const res = await fetch(url.toString());

    if (!res.ok) {
      throw new Error('상품 데이터를 불러오는 데 실패했습니다.');
    }

    return res.json();
  };
};
export default getProducts;
