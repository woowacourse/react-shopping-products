import useProductList, { PAGE } from './useProductList';
import { waitFor, renderHook, act } from '@testing-library/react';
import { ChangeEvent } from 'react';
import ToastProvider from './useToast';
import { SortValue } from '@/constants/filter';

describe('useProductList', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ToastProvider>{children}</ToastProvider>
  );
  describe('상품 목록 조회', () => {
    it('상품 목록을 조회한다.', async () => {
      const { result } = renderHook(() => useProductList(), { wrapper });

      act(() => result.current.fetchNextPage());

      await waitFor(() => {
        expect(result.current.productList).toHaveLength(PAGE.START_SIZE);
      });
    });

    it('상품 목록 조회 중엔 로딩 상태가 된다.', () => {
      const { result } = renderHook(() => useProductList(), { wrapper });

      act(() => result.current.fetchNextPage());

      expect(result.current.loading).toBe(true);
    });

    it('상품 목록 조회가 끝나면 로딩 상태도 끝난다.', async () => {
      const { result } = renderHook(() => useProductList(), { wrapper });

      act(() => result.current.fetchNextPage());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });
    });
  });

  describe('페이지네이션', () => {
    it(`첫 페이지는 ${PAGE.START_SIZE}개의 상품 목록을 불러온다.`, async () => {
      const { result } = renderHook(() => useProductList(), { wrapper });

      act(() => result.current.fetchNextPage());

      await waitFor(() => {
        expect(result.current.productList).toHaveLength(PAGE.START_SIZE);
      });
    });

    it(`이후 페이지는 ${PAGE.SIZE}개의 상품 목록을 불러온다.`, async () => {
      const { result } = renderHook(() => useProductList(), { wrapper });

      act(() => result.current.fetchNextPage());

      await waitFor(() => {
        expect(result.current.productList).toHaveLength(PAGE.START_SIZE);
        expect(result.current.page).toBe(PAGE.START);
      });

      act(() => result.current.fetchNextPage());

      await waitFor(() => {
        expect(result.current.productList).toHaveLength(PAGE.START_SIZE + PAGE.SIZE);
        expect(result.current.page).toBe(PAGE.START + 1);
      });
    });
  });

  describe('필터 변경 발생', () => {
    it(`정렬 기준이 바뀌면 ${PAGE.START}페이지부터 다시 받아온다.`, async () => {
      const { result } = renderHook(() => useProductList(), { wrapper });
      const sortValue: SortValue = 'price,desc';
      act(() => {
        result.current.fetchNextPage();
        result.current.fetchNextPage(); // 연속 페치가 될 지 확신 없음
      });

      await waitFor(() => {
        expect(result.current.page).toBe(PAGE.START + 1);
      });

      act(() => {
        const event = {
          target: {
            value: sortValue,
          },
        } as ChangeEvent<HTMLSelectElement>;

        result.current.handleSortType(event.target.value as SortValue);
      });

      await waitFor(() => {
        expect(result.current.page).toBe(PAGE.START);
      });
    });

    it(`카테고리가 바뀌면 ${PAGE.START}페이지부터 다시 받아온다.`, async () => {
      const { result } = renderHook(() => useProductList(), { wrapper });

      const targetCategory = 'electronics';

      act(() => {
        result.current.fetchNextPage();
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.page).toBe(PAGE.START + 1);
      });

      act(() => {
        const event = {
          target: {
            value: 'electronics',
          },
        } as ChangeEvent<HTMLSelectElement>;

        result.current.handleCategory(event.target.value);
      });

      await waitFor(() => {
        expect(result.current.page).toBe(PAGE.START);
        expect(
          result.current.productList.every(({ category }) => category === targetCategory),
        ).toBe(true);
      });
    });
  });
});
