import { act, fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { TOAST_TYPES } from "../../shared/config/toast";
import { ToastProvider } from "../../shared/contexts/ToastContext";
import useToast from "../../shared/hooks/useToast";

const toastMessage = "토스트 테스트용 메시지";
const duration = 4000;

function TestComponent() {
  const { showToast } = useToast();
  return (
    <div>
      <button
        onClick={() =>
          showToast({ message: toastMessage, type: TOAST_TYPES.ERROR })
        }
      >
        Show Toast
      </button>
    </div>
  );
}

describe("ToastProvider & useToast 테스트", () => {
  it("showToast가 호출되면 토스트를 보여준다.", async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText("Show Toast"));
    expect(screen.getByText(toastMessage)).toBeInTheDocument();
  });

  it("지정된 시간(duration) 후에 토스트를 숨긴다.", async () => {
    vi.useFakeTimers();
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText("Show Toast"));
    expect(screen.getByText(toastMessage)).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(duration));
    expect(screen.queryByText(toastMessage)).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  describe("Toast 타입별 배경 색 테스트", () => {
    it.each([
      { type: TOAST_TYPES.SUCCESS, color: "#ace6a8" },
      { type: TOAST_TYPES.ERROR, color: "#ffc9c9" },
      { type: TOAST_TYPES.INFO, color: "#e6e6e6" },
      { type: TOAST_TYPES.WARNING, color: "#ffdc69" },
    ])(
      "$type 타입일 때 해당 타입에 대한 배경색($color)을 적용한다.",
      ({ type, color }) => {
        function TypeTestComponent() {
          const { showToast } = useToast();
          return (
            <button onClick={() => showToast({ message: type, type })}>
              {type}
            </button>
          );
        }

        render(
          <ToastProvider>
            <TypeTestComponent />
          </ToastProvider>
        );

        fireEvent.click(screen.getByText(type));
        expect(screen.getByTestId("toast")).toHaveStyle({
          backgroundColor: color,
        });
      }
    );
  });

  it("ToastProvider 외부에서 useToast을 사용하면 에러를 던진다.", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    function ErrorComponent() {
      useToast();
      return null;
    }
    expect(() => render(<ErrorComponent />)).toThrow(
      "useToast must be used within ToastProvider"
    );
    spy.mockRestore();
  });
});
