import useProduct from './useProduct';
import { waitFor, renderHook, act } from '@testing-library/react';
import { ChangeEvent } from 'react';

const INITIAL_PRODUCT_LENGTH = 20;
const ADDITIONAL_PRODUCT_LENGTH = 4;

describe('useProduct에 대한 테스트 코드 작성', () => {
  describe('상품 목록 조회', () => {
    it('상품 목록을 조회한다.', async () => {
      const { result } = renderHook(() => useProduct());

      await waitFor(() => {
        expect(result.current.productList).toEqual([]);
        expect(result.current.isLoading).toBe(true);
      });

      await waitFor(() => {
        expect(result.current.productList).toHaveLength(INITIAL_PRODUCT_LENGTH);
      });
    });

    it('상품 목록 조회 중엔 로딩 상태가 된다.', async () => {
      const { result } = renderHook(() => useProduct());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(true);
      });
    });

    it('상품 목록 조회가 끝나면 로딩 상태도 끝난다.', async () => {
      const { result } = renderHook(() => useProduct());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
        expect(result.current.productList).toHaveLength(INITIAL_PRODUCT_LENGTH);
      });
    });
  });

  describe('페이지네이션', () => {
    it('초기에 첫 페이지의 상품 20개를 불러온다', async () => {
      const { result } = renderHook(() => useProduct());

      await waitFor(() => {
        expect(result.current.productList).toHaveLength(INITIAL_PRODUCT_LENGTH);
        expect(result.current.page).toBe(0);
      });
    });

    it('그 후에 추가적으로 4개를 더 불러온다.', async () => {
      const { result } = renderHook(() => useProduct());

      await waitFor(() => {
        expect(result.current.productList).toHaveLength(INITIAL_PRODUCT_LENGTH);
        expect(result.current.page).toBe(0);
      });

      act(() => {
        result.current.handleNextPage();
      });

      await waitFor(() => {
        expect(result.current.productList).toHaveLength(
          INITIAL_PRODUCT_LENGTH + ADDITIONAL_PRODUCT_LENGTH,
        );
        expect(result.current.page).toBe(1);
      });
    });

    it('페이지네이션으로 추가 데이터를 불러올 때 로딩 상태를 표시한다.', async () => {
      const { result } = renderHook(() => useProduct());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      act(() => {
        result.current.handleNextPage();
      });

      expect(result.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });
  });
  describe('필터 변경 발생', () => {
    it('정렬 기준이 바뀌면 1페이지부터 다시 받아온다.', async () => {
      const { result } = renderHook(() => useProduct());

      act(() => {
        result.current.handleNextPage();
        result.current.handleNextPage();
      });

      await waitFor(() => {
        expect(result.current.page).toBe(2);
      });

      act(() => {
        const event = {
          target: {
            value: 'desc',
          },
        } as ChangeEvent<HTMLSelectElement>;

        result.current.handleSortType(event.target.value);
      });

      await waitFor(() => {
        expect(result.current.page).toBe(0);
        expect(result.current.productList.length).toBeGreaterThan(0);
      });
    });
    it('카테고리가 바뀌면 1페이지부터 다시 받아온다.', async () => {
      const { result } = renderHook(() => useProduct());

      const targetCategory = 'electronics';

      act(() => {
        result.current.handleNextPage();
        result.current.handleNextPage();
      });

      await waitFor(() => {
        expect(result.current.page).toBe(2);
      });

      act(() => {
        const event = {
          target: {
            value: targetCategory,
          },
        } as ChangeEvent<HTMLSelectElement>;

        result.current.handleCategory(event.target.value);
      });

      await waitFor(() => {
        expect(result.current.page).toBe(0);
        expect(
          result.current.productList.every(({ category }) => category === targetCategory),
        ).toBe(true);
      });
    });
  });
});
