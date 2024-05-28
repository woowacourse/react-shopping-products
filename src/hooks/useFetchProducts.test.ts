import { renderHook, waitFor } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { ENDPOINTS_PRODUCTS } from '../api/endpoints';
import { server } from '../mocks/node';
import useFetchProducts from './useFetchProducts';

describe('fetchProducts', () => {
  it('상품 목록 첫 조회시에는 20개의 아이템을 가져온다.', async () => {
    const { result } = renderHook(() => useFetchProducts());

    await waitFor(() => {
      expect(result.current.products).toHaveLength(20);
    });
  });

  it('상품 목록 조회 시 에러', async () => {
    renderHook(() => {
      server.use(
        http.get(ENDPOINTS_PRODUCTS, () => {
          return new HttpResponse(null, { status: 500 });
        }),
      );
    });

    const { result } = renderHook(useFetchProducts);

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
  });

  //
});
