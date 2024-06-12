import React, { act } from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import useFetchProducts from '@/hooks/queries/product/useFetchProducts';

import { FETCH_SIZE } from '@/constants/productList';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const TOTAL_DATA_LENGTH =
  FETCH_SIZE.firstPageItemCount + FETCH_SIZE.moreLoadItemCount;

describe('useFetchProducts 테스트', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  describe('상품 목록 조회 테스트', () => {
    it(`초기 랜더링시 첫 페이지의 상품 ${FETCH_SIZE.firstPageItemCount}개를 불러온다.`, async () => {
      const { result } = renderHook(
        () => useFetchProducts({ sort: 'asc', category: '' }),
        { wrapper },
      );

      await waitFor(() => {
        expect(result.current.products).toHaveLength(
          FETCH_SIZE.firstPageItemCount,
        );
      });
    });

    it(`다음 페이지가 존재하면 상품 ${FETCH_SIZE.moreLoadItemCount}개를 불러온다. (총 ${TOTAL_DATA_LENGTH}개)`, async () => {
      const { result } = renderHook(
        () => useFetchProducts({ sort: 'asc', category: '' }),
        { wrapper },
      );

      await waitFor(() => {
        expect(result.current.products).toHaveLength(
          FETCH_SIZE.firstPageItemCount,
        );
      });
      act(() => {
        if (result.current.hasNextPage) {
          result.current.fetchNextPage();
        }
      });
      await waitFor(() => {
        expect(result.current.products).toHaveLength(TOTAL_DATA_LENGTH);
      });
    });

    it('상품 목록 조회 전 로딩 상태를 가진다.', async () => {
      const { result } = renderHook(
        () => useFetchProducts({ sort: 'asc', category: '' }),
        { wrapper },
      );

      expect(result.current.isLoading).toBe(true);
    });
  });
});
