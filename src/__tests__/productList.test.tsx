import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react';

import MockWrapper from '../mocks/MockWrapper';

import useProductList from '@/hooks/useProductList';

const INITIAL_OPTION = { category: 'all', sortOptions: 'asc' } as const;

describe('productList', () => {
  it('첫 페이지에서는 20개의 상품 목록을 불러온다.', async () => {
    const { result } = renderHook(() => useProductList(INITIAL_OPTION), {
      wrapper: MockWrapper,
    });

    await waitFor(() => {
      expect(result.current.data?.pages[0].content).toHaveLength(20);
      expect(result.current.data?.pageParams[0]).toBe(0);
    });
  });

  it('다음 페이지에서는 4개의 상품 목록을 추가로 불러온다.', async () => {
    const { result } = renderHook(() => useProductList(INITIAL_OPTION), { wrapper: MockWrapper });

    await waitFor(() => {
      expect(result.current.data?.pages[0].content).toHaveLength(20);
      expect(result.current.data?.pageParams[0]).toBe(0);
    });

    act(() => {
      result.current.fetchNextPage();
    });

    await waitFor(() => {
      expect(result.current.data?.pages[1].content).toHaveLength(4);
      expect(result.current.data?.pageParams[1]).toBe(5);
    });
  });
  it('마지막 페이지 일 때 상품 목록을 불러오지 않는다.', async () => {
    const { result } = renderHook(() => useProductList(INITIAL_OPTION), { wrapper: MockWrapper });
    const PAGE_LENGTH = 5;

    await waitFor(() => {
      expect(result.current.data?.pages[0].content).toHaveLength(20);
      expect(result.current.data?.pageParams[0]).toBe(0);
    });

    for (let i = 1; i < PAGE_LENGTH + 1; i += 1) {
      act(() => {
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.data?.pages[i].content).toHaveLength(4);
        expect(result.current.data?.pageParams[i]).toBe(i + 4);
      });
    }

    await act(async () => {
      result.current.fetchNextPage();
    });

    await waitFor(() => {
      expect(result.current.data?.pageParams[PAGE_LENGTH]).toBe(9);
    });
  });

  it('상품 목록 데이터를 불러오기 전 로딩 화면이 표시된다.', async () => {
    const { result } = renderHook(() => useProductList(INITIAL_OPTION), { wrapper: MockWrapper });

    expect(result.current.isLoading).toBeTruthy();

    await waitFor(() => {
      expect(result.current.isLoading).toBeFalsy();
    });
  });
});
