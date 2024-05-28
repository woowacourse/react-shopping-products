import { act, renderHook, waitFor } from '@testing-library/react';
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

  it('첫 상품목록 조회 이후부터는, 이전 결과에 이어 4개씩 아이템을 추가하여 가져온다.', async () => {
    const { result } = renderHook(() => useFetchProducts());

    await waitFor(() => {
      expect(result.current.products).toHaveLength(20);
    });

    act(() => result.current.fetchNextPage());

    await waitFor(() => {
      expect(result.current.products).toHaveLength(24);
    });
  });

  it('마지막 페이지 도달 시 더 이상 요청하지 않는다.', async () => {
    const { result } = renderHook(() => useFetchProducts());

    await waitFor(() => {
      expect(result.current.products).toHaveLength(20);
    });

    act(() => result.current.fetchNextPage());
    for (let i = 2; i <= 21; i++) {
      act(() => result.current.fetchNextPage());
    }

    await waitFor(() => {
      expect(result.current.products).toHaveLength(100);
    });

    act(() => result.current.fetchNextPage());

    await waitFor(() => {
      expect(result.current.products).toHaveLength(100);
    });
  });
});
