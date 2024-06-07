import { Filtering } from '@appTypes/index';
import queryClientWrapper from '@src/testSetup/queryClientWrapper';
import { act, renderHook, waitFor } from '@testing-library/react';

import useProductList from '../useProductList';

describe('상품 목록 테스트', () => {
  describe('무한 스크롤 테스트', () => {
    it('첫번째 페이지에서 20개의 상품을 불러온다.', async () => {
      const EXPECTED_LENGTH = 20;
      const FILTERING: Filtering = {
        sort: 'price,asc',
        category: '',
      };
      const { result } = renderHook(() => useProductList(FILTERING), { wrapper: queryClientWrapper });

      await waitFor(() => expect(result.current.status).toBe('success'));

      await waitFor(() => {
        expect(result.current.products).toBeDefined();
      });

      expect(result.current.products?.length).toBe(EXPECTED_LENGTH);
    });

    it('다음 페이지에서는 4개의 상품을 추가로 불러온다. (총 개수:24)', async () => {
      const FIRST_PAGE_PRODUCT_LENGTH = 20;
      const PLUS_LENGTH = 4;
      const FILTERING: Filtering = {
        sort: 'price,asc',
        category: '',
      };
      const { result } = renderHook(() => useProductList(FILTERING), { wrapper: queryClientWrapper });

      await waitFor(() => {
        expect(result.current.status).toBe('success');
      });

      expect(result.current.products?.length).toBe(FIRST_PAGE_PRODUCT_LENGTH);

      act(() => {
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.status).toBe('success');
      });

      expect(result.current.products?.length).toBe(FIRST_PAGE_PRODUCT_LENGTH + PLUS_LENGTH);
    });
  });

  describe('필터링 테스트', () => {});
});
