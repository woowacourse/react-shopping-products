import { Filtering, Product, ServerResponse } from '@appTypes/index';
import { fetchWithToken } from '@utils/index';

import { END_POINTS } from './endPoints';

export async function fetchProduct(filtering: Filtering): Promise<{ products: Product[]; isLast: boolean }> {
  const params = '?' + new URLSearchParams(filtering.category ? { ...filtering } : { sort: filtering.sort });

  const data = await fetchWithToken<ServerResponse<Product[]>>({
    url: END_POINTS.products + params,
    method: 'GET',
  });

  return { products: data.content, isLast: data.last };
}
