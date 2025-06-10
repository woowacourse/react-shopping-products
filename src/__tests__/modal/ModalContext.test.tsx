import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { ModalProvider } from "../../shared/contexts/ModalContext";
import useModal from "../../shared/hooks/useModal";

function TestComponent() {
  const { openModal, closeModal } = useModal();
  return (
    <div>
      <button onClick={() => openModal(<div>Modal Content</div>)}>Open</button>
      <button onClick={closeModal}>Close</button>
    </div>
  );
}

describe("ModalProvider & useModal 테스트", () => {
  it("openModal이 호출되면 모달 콘텐츠를 보여준다.", () => {
    render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>
    );
    fireEvent.click(screen.getByText("Open"));
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("closeModal이 호출되면 모달 콘텐츠를 숨긴다.", () => {
    render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>
    );
    fireEvent.click(screen.getByText("Open"));
    fireEvent.click(screen.getByText("Close"));
    expect(screen.queryByText("Modal Content")).not.toBeInTheDocument();
  });

  it("ModalProvider 외부에서 useModal을 사용하면 에러를 던진다.", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    function ErrorComponent() {
      useModal();
      return null;
    }
    expect(() => render(<ErrorComponent />)).toThrow(
      "useModal must be used within ModalProvider"
    );
    spy.mockRestore();
  });
});
