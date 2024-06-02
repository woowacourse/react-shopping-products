import { renderHook, waitFor } from '@testing-library/react';
import useProducts from '../useProducts';
import { server } from '../../mocks/server';
import { HttpResponse, http } from 'msw';

import { PRODUCTS_ENDPOINT } from '../../api/endpoints';
import { FIRST_PAGE_SIZE } from '../../constants/pagination';

describe('첫 페이지 상품 목록 조회', () => {
  it('상품 목록 조회 중 로딩 상태를 "true"로 세팅한다.', async () => {
    const { result } = renderHook(() => useProducts());

    expect(result.current.loading).toBeTruthy();

    await waitFor(() => {
      expect(result.current.loading).toBeFalsy();
    });
  });

  it(`첫 페이지에서는 상품 목록 ${FIRST_PAGE_SIZE}개를 조회한다.`, async () => {
    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.products).toHaveLength(FIRST_PAGE_SIZE);
    });
  });

  it('상품 목록 조회 중 에러가 발생한다면 에러 상태를 "Error"로 세팅한다.', async () => {
    server.use(
      http.get(PRODUCTS_ENDPOINT, () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );
    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.products).toEqual([]);
      expect(result.current.loading).toEqual(false);
      expect(result.current.error).not.toBeNull();
    });
  });
});
