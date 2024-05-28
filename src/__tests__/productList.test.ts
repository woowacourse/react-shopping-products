import { renderHook, waitFor } from '@testing-library/react';

import useProductList from '@/hooks/useProductList';

describe('productList', () => {
  it('첫 페이지에서는 20개의 상품 목록을 불러와야 한다.', async () => {
    const { result } = renderHook(() => useProductList());

    await waitFor(() => {
      expect(result.current.productList.length).toBe(20);
      expect(result.current.page).toBe(0);
    });
  });
});
