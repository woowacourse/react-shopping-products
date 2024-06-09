import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS, productApi, productApiGetParams, ProductsResponse } from '@/shared';

export const useGetProductsQuery = (props: productApiGetParams) =>
  useQuery<ProductsResponse>({
    initialData: {} as ProductsResponse,
    queryKey: [QUERY_KEYS.getProducts],
    queryFn: async () => await productApi.get(props),
  });
