import { act, renderHook } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TOAST_TYPES } from "../shared/config/toast";
import { ToastProvider } from "../shared/contexts/ToastContext";
import useFetch from "../shared/hooks/useFetch";

const mockShowToast = vi.fn();

vi.mock("../shared/hooks/useToast", () => ({
  default: () => ({
    showToast: mockShowToast,
  }),
}));

const wrapper = ({ children }: PropsWithChildren) => (
  <ToastProvider>{children}</ToastProvider>
);

describe("useFetch 훅 테스트", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("초기 상태값을 반환해야 한다.", () => {
    const { result } = renderHook(() => useFetch(vi.fn()), { wrapper });
    expect(result.current).toEqual({
      data: null,
      loading: false,
      error: false,
      success: false,
      fetchData: expect.any(Function),
    });
  });

  it("데이터 패칭이 성공한 경우, 상태 값들이 올바르게 설정된다.", async () => {
    const mockData = { id: 1 };
    const mockFetch = vi.fn().mockResolvedValue(mockData);
    const { result } = renderHook(() => useFetch(mockFetch), { wrapper });

    await act(async () => {
      await result.current.fetchData();
    });

    expect(result.current).toMatchObject({
      data: mockData,
      loading: false,
      error: false,
      success: true,
    });
  });

  it("에러가 발생한 경우, 상태를 업데이트하고 에러 토스트를 표시한다.", async () => {
    const errorMessage = "에러 발생";
    const mockFetch = vi.fn().mockRejectedValue(new Error(errorMessage));
    const { result } = renderHook(() => useFetch(mockFetch, true), { wrapper });

    await act(async () => {
      await result.current.fetchData();
    });

    expect(result.current).toMatchObject({
      data: null,
      loading: false,
      error: true,
      success: false,
    });
    expect(mockShowToast).toHaveBeenCalledWith({
      message: errorMessage,
      type: TOAST_TYPES.ERROR,
    });
  });

  it("showError가 false일 때 토스트를 표시하지 않는다.", async () => {
    const errorMessage = "에러 발생";
    const mockFetch = vi.fn().mockRejectedValue(new Error(errorMessage));
    const { result } = renderHook(() => useFetch(mockFetch, false), {
      wrapper,
    });

    await act(async () => {
      await result.current.fetchData();
    });

    expect(mockShowToast).not.toHaveBeenCalled();
  });

  it("패칭 중에는 loading 상태가 true가 된다.", async () => {
    const mockFetch = vi.fn(
      () => new Promise((resolve) => setTimeout(() => resolve({}), 100))
    );
    const { result } = renderHook(() => useFetch(mockFetch), { wrapper });

    act(() => {
      result.current.fetchData();
    });

    expect(result.current.loading).toBe(true);

    await act(() => mockFetch.mock.results[0].value);
  });
});
