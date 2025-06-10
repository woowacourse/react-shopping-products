import { act, renderHook } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TOAST_TYPES } from "../shared/config/toast";
import { ToastProvider } from "../shared/contexts/ToastContext";
import useMutation from "../shared/hooks/useMutation";

const mockShowToast = vi.fn();

vi.mock("../shared/hooks/useToast", () => ({
  default: () => ({
    showToast: mockShowToast,
  }),
}));

const wrapper = ({ children }: PropsWithChildren) => (
  <ToastProvider>{children}</ToastProvider>
);

describe("useMutation 훅 테스트", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("mutate를 성공적으로 실행했을 때, onSuccess 콜백과 토스트를 호출한다.", async () => {
    const mockData = { id: 1 };
    const mockMutation = vi.fn().mockResolvedValue(undefined);
    const mockOnSuccess = vi.fn();

    const { result } = renderHook(
      () =>
        useMutation(mockMutation, {
          onSuccess: mockOnSuccess,
          successMessage: "성공!",
        }),
      { wrapper }
    );

    await act(async () => {
      await result.current.mutate(mockData);
    });

    expect(mockMutation).toHaveBeenCalledWith(mockData);
    expect(mockOnSuccess).toHaveBeenCalledWith(mockData);
    expect(mockShowToast).toHaveBeenCalledWith({
      message: "성공!",
      type: TOAST_TYPES.SUCCESS,
    });
  });

  it("mutate를 실패했을 때, onError 콜백과 에러 토스트를 호출한다.", async () => {
    const errorMessage = "원본 에러 메시지";
    const customErrorMessage = "커스텀 에러 메시지";

    const mockData = { id: 1 };
    const mockMutation = vi.fn().mockRejectedValue(new Error(errorMessage));
    const mockOnError = vi.fn();

    const { result } = renderHook(
      () =>
        useMutation(mockMutation, {
          onError: mockOnError,
          errorMessage: customErrorMessage,
        }),
      { wrapper }
    );

    await act(async () => {
      await result.current.mutate(mockData);
    });

    expect(mockMutation).toHaveBeenCalledWith(mockData);
    expect(mockOnError).toHaveBeenCalled();
    expect(mockShowToast).toHaveBeenCalledWith({
      message: customErrorMessage,
      type: TOAST_TYPES.ERROR,
    });
  });

  it("직접 설정한 errorMessage가 없을 경우 error 객체의 메시지를 토스트에 출력한다.", async () => {
    const errorMessage = "원본 에러 메시지";
    const mockMutation = vi.fn().mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useMutation(mockMutation), {
      wrapper,
    });

    await act(async () => {
      await result.current.mutate({});
    });

    expect(mockShowToast).toHaveBeenCalledWith({
      message: errorMessage,
      type: TOAST_TYPES.ERROR,
    });
  });

  it("예외가 Error 인스턴스가 아닐 경우 기본 메시지를 출력한다.", async () => {
    const mockMutation = vi.fn().mockRejectedValue("알 수 없는 에러");

    const { result } = renderHook(() => useMutation(mockMutation), {
      wrapper,
    });

    await act(async () => {
      await result.current.mutate({});
    });

    expect(mockShowToast).toHaveBeenCalledWith({
      message: "알 수 없는 오류가 발생했습니다.",
      type: TOAST_TYPES.ERROR,
    });
  });
});
