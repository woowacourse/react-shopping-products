import { renderHook, waitFor } from '@testing-library/react';
import useFetchProducts from '../useFetchProducts';

import { FIRST_PAGE_SIZE } from '../../constants/pagination';

import wrapper from './wrapper';

describe('첫 페이지 상품 목록 조회', () => {
  it(`첫 페이지에서는 상품 목록 ${FIRST_PAGE_SIZE}개를 조회한다.`, async () => {
    const { result } = renderHook(() => useFetchProducts(), { wrapper });

    await waitFor(() => {
      expect(result.current.products).toHaveLength(FIRST_PAGE_SIZE);
    });
  });
});
