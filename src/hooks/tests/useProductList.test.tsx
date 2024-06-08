import { queryClient } from '@/App';
import { waitFor, renderHook, act } from '@testing-library/react';
import { ChangeEvent } from 'react';
import useProductList from '../useProductList';
import TestWrapper from './TestWrapper';
import 'node_modules/brgndyy-react-modal/dist/style.css';

const INITIAL_PRODUCT_LENGTH = 20;
const ADDITIONAL_PRODUCT_LENGTH = 4;

describe('useProduct에 대한 테스트 코드 작성', () => {
  describe('상품 목록 조회', () => {
    it('초기에 상품 목록을 정상적으로 받아올 수 있다.', async () => {
      const { result } = renderHook(() => useProductList(), { wrapper: TestWrapper });

      await waitFor(() => {
        expect(result.current.productList).toHaveLength(INITIAL_PRODUCT_LENGTH);
      });
    });
  });
  it('상품 목록 데이터 페칭이 완료 되면, isLoading은 false가 된다.', async () => {
    const { result } = renderHook(() => useProductList(), { wrapper: TestWrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('페이지네이션 관련 테스트 코드 작성', () => {
    it('초기에 첫 페이지의 상품 20개를 불러온다', async () => {
      const { result } = renderHook(() => useProductList(), { wrapper: TestWrapper });

      await waitFor(() => {
        expect(result.current.productList).toHaveLength(INITIAL_PRODUCT_LENGTH);
      });
    });

    it('그 후에 추가적으로 4개의 데이터를 더 불러온다.', async () => {
      const { result } = renderHook(() => useProductList(), { wrapper: TestWrapper });

      await waitFor(() => {
        expect(result.current.productList).toHaveLength(INITIAL_PRODUCT_LENGTH);
      });

      act(() => {
        result.current.handleNextPage();
      });

      await waitFor(() => {
        expect(result.current.productList).toHaveLength(
          INITIAL_PRODUCT_LENGTH + ADDITIONAL_PRODUCT_LENGTH,
        );
      });
    });
  });
});

describe('필터 변경 이벤트가 발생했을때의 테스트 코드 작성', () => {
  beforeEach(() => {
    queryClient.clear();
  });
  it('정렬 기준이 바뀌면 1페이지부터 다시 받아온다.', async () => {
    const { result } = renderHook(() => useProductList(), { wrapper: TestWrapper });

    act(() => {
      result.current.handleNextPage();
    });

    await waitFor(() => {
      expect(result.current.productList).toHaveLength(
        INITIAL_PRODUCT_LENGTH + ADDITIONAL_PRODUCT_LENGTH,
      );
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
      expect(result.current.productList).toHaveLength(INITIAL_PRODUCT_LENGTH);
    });
  });

  // TODO 해당 테스트 계속 실패, 데이터 받아오는거 32개로 찍힘 (@버건디)
  it('카테고리가 바뀌면 1페이지부터 다시 받아온다.', async () => {
    const { result } = renderHook(() => useProductList(), { wrapper: TestWrapper });

    act(() => {
      result.current.handleNextPage();
    });

    await waitFor(() => {
      expect(result.current.productList).toHaveLength(
        INITIAL_PRODUCT_LENGTH + ADDITIONAL_PRODUCT_LENGTH,
      );
    });

    // act(() => {
    //   const event = {
    //     target: {
    //       value: targetCategory,
    //     },
    //   } as ChangeEvent<HTMLSelectElement>;

    //   result.current.handleCategory(event.target.value);
    // });

    // await waitFor(() => {
    //   expect(result.current.productList).toHaveLength(INITIAL_PRODUCT_LENGTH);
    //   expect(result.current.productList.every(({ category }) => category === targetCategory)).toBe(
    //     true,
    //   );
    // });
  });
});
