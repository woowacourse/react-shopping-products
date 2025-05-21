import { act, renderHook } from '@testing-library/react';
import useDisclosure from './useDisclosure';

describe('useDisclosure', () => {
  it('초기 상태는 닫혀있다.', () => {
    const { result } = renderHook(() => useDisclosure());
    expect(result.current.isOpen).toBe(false);
  });

  it('isOpen 상태를 변경할 수 있다.', () => {
    const { result } = renderHook(() => useDisclosure());

    act(() => {
      result.current.toggle();
    });

    expect(result.current.isOpen).toBe(true);
  });
});
