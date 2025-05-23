import { act, renderHook } from '@testing-library/react';
import useCategory from './useCategory';

describe('useCategory', () => {
  it('초기 카테고리는 "전체"이다.', () => {
    const { result } = renderHook(() => useCategory());
    expect(result.current.category).toBe('전체');
  });

  it('카테고리를 변경할 수 있다.', () => {
    const { result } = renderHook(() => useCategory());

    act(() => {
      result.current.selectCategory('식료품');
    });

    expect(result.current.category).toBe('식료품');
  });

  it('카테고리를 초기화할 수 있다.', () => {
    const { result } = renderHook(() => useCategory());

    act(() => {
      result.current.selectCategory('식료품');
      result.current.resetCategory();
    });

    expect(result.current.category).toBe('전체');
  });
});
