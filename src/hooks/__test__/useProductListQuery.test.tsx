import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

import { FETCH_SIZE } from '@/constants/productList';
import { Product } from '@/types/product.type';
import useProductListQuery from '@/hooks/useProductListQuery';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useProduct with react-query', () => {
  it('상품 목록을 조회할 수 있다. ', async () => {
    const { result } = renderHook(() => useProductListQuery(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.products.slice(0, 1)).toEqual<Product[]>([
      {
        id: 2,
        name: '나이키',
        price: 1000,
        imageUrl:
          'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a28864e3-de02-48bb-b861-9c592bc9a68b/%EB%B6%81-1-ep-%EB%86%8D%EA%B5%AC%ED%99%94-UOp6QQvg.png',
        category: 'fashion',
      },
    ]);

    expect(result.current.products).toHaveLength(FETCH_SIZE.firstPageItemCount);
  });
});
