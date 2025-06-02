import { act, renderHook } from '@testing-library/react';
import useSort from '../useSort';

describe('useSort', () => {
  it('초기 정렬은 오름차순이다.', () => {
    const { result } = renderHook(() => useSort());

    expect(result.current.sortType).toBe('낮은 가격순');
  });

  it('정렬을 변경할 수 있다.', () => {
    const { result } = renderHook(() => useSort());

    act(() => {
      result.current.selectSort('높은 가격순');
    });

    expect(result.current.sortType).toBe('높은 가격순');
  });

  it('정렬을 초기화할 수 있다.', () => {
    const { result } = renderHook(() => useSort());

    act(() => {
      result.current.selectSort('높은 가격순');
      result.current.resetSort();
    });

    expect(result.current.sortType).toBe('낮은 가격순');
  });
});
