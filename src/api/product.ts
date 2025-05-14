import { SortKeyType } from '../types/product';

// 기본 상품 정렬 - 오름차순(작은 것 부터)
export const getProduct = async (sort: SortKeyType) => {
  const response = await fetch(
    `http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com/products?page=0&size=20&sort=price,${sort}`
  );
  const data = await response.json();

  return data;
};
