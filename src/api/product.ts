import { SortKeyType } from '../types/product';

export const getProduct = async (sort: SortKeyType) => {
  const response = await fetch(
    `http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com/products?page=0&size=20&sort=price,${sort}&sort=id,desc`
  );
  const data = await response.json();

  return data;
};
