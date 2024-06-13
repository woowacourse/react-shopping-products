import { act, renderHook, waitFor } from '@testing-library/react';

import useAddCartItemQuery from './useAddCartItemQuery';

import MockWrapper from '@/mocks/MockWrapper';
import { Product } from '@/types/product';

describe('useAddCartItemQuery', () => {
  it('새로운 제품을 추가할 수 있다.', async () => {
    const { result } = renderHook(() => useAddCartItemQuery(), { wrapper: MockWrapper });
    const product: Product = {
      id: -1,
      name: 'hello',
      price: 10000000,
      imageUrl: '',
      category: 'kitchen',
    };

    act(() => {
      result.current.mutate(product.id);
    });

    await waitFor(() => expect(result.current.data?.status).toBe(200));
  });
});
