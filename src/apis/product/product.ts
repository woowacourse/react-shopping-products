import APIClient from '@apis/APIClient';
import { ProductEndpointParams } from '@apis/product/product.type';
import { getProductEndpoint } from '@apis/product/product.util';
import { Product } from '@appTypes/product';
import { InfinityScrollResponse } from '@appTypes/response';

export const fetchProducts = async (
  params: ProductEndpointParams
): Promise<InfinityScrollResponse<Product[]>> => {
  const response = await APIClient.get(getProductEndpoint(params));
  const data = await response.json();

  APIClient.validateResponse(response, data.error);

  return data;
};
