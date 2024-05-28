import { PRODUCTS } from './endpoints';
import fetcher from './fetcher';

export const fetchProductList = async (page: number) => {
  const response = await fetcher.get({
    url: `${PRODUCTS}?page=${page}`,
    errorMessage: '상품 리스트 불러오기에 실패했습니다.🥹',
  });

  const data = await response.json();

  return data;
};
