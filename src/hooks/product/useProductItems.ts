import { Product } from '@appTypes/product';
import { BaseResponse } from '@appTypes/response';
import useFetch from '@hooks/useFetch';

const useProducts = () => {
  const { data } = useFetch<BaseResponse<Product[]>>('products');

  return { products: data?.content ?? [] };
};

export default useProducts;
