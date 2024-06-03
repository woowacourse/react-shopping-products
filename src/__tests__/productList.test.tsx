import { renderHook, waitFor } from '@testing-library/react';
import { PropsWithChildren, act } from 'react';

import { ToastContext } from '@/context/toast';

import useProductList from '@/hooks/useProductList';

const wrapper = ({ children }: PropsWithChildren) => (
  <ToastContext.Provider value={{ isShow: true, error: () => {} }}>
    {children}
  </ToastContext.Provider>
);

describe('productList', () => {
  it('첫 페이지에서는 20개의 상품 목록을 불러온다.', async () => {
    const { result } = renderHook(() => useProductList(), { wrapper });

    await waitFor(() => {
      expect(result.current.productList).toHaveLength(20);
      expect(result.current.page).toBe(0);
    });
  });

  it('다음 페이지에서는 4개의 상품 목록을 추가로 불러온다.', async () => {
    const { result } = renderHook(() => useProductList(), { wrapper });

    await waitFor(() => {
      expect(result.current.productList).toHaveLength(20);
      expect(result.current.page).toBe(0);
    });

    act(() => {
      result.current.fetchNextPage();
    });

    await waitFor(() => {
      expect(result.current.productList).toHaveLength(24);
      expect(result.current.page).toBe(5);
    });
  });
  it('마지막 페이지 일 때 상품 목록을 불러오지 않는다.', async () => {
    const { result } = renderHook(() => useProductList(), { wrapper });

    await waitFor(() => {
      expect(result.current.productList.length).toBe(20);
      expect(result.current.page).toBe(0);
    });

    for (let page = 5; page < 10; page += 1) {
      act(() => {
        result.current.fetchNextPage();
      });

      const expectedProductsCount = 20 + (page - 4) * 4;

      await waitFor(() => {
        expect(result.current.page).toBe(page);
        expect(result.current.productList).toHaveLength(expectedProductsCount);
      });
    }

    await act(async () => {
      result.current.fetchNextPage();
    });

    await waitFor(() => {
      expect(result.current.productList.length).toBe(40);
      expect(result.current.page).toBe(9);
    });
  });

  it('상품 목록 데이터를 불러오기 전 로딩 화면이 표시된다.', async () => {
    const { result } = renderHook(() => useProductList(), { wrapper });

    expect(result.current.isLoading).toBeTruthy();

    await waitFor(() => {
      expect(result.current.isLoading).toBeFalsy();
    });
  });
});
