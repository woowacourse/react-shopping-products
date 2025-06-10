import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Modal from "../shared/ui/Modal/Modal";

describe("Modal 테스트", () => {
  const modalText = "모달 테스트용 텍스트";

  it("open이 true일 때 children을 렌더링한다.", () => {
    render(
      <Modal open={true} onClose={vi.fn()}>
        {modalText}
      </Modal>
    );
    expect(screen.getByText(modalText)).toBeInTheDocument();
  });

  it("open이 false일 때 children을 렌더링하지 않는다.", () => {
    render(
      <Modal open={false} onClose={vi.fn()}>
        {modalText}
      </Modal>
    );
    expect(screen.queryByText(modalText)).not.toBeInTheDocument();
  });

  it("모달 배경(Backdrop)을 클릭하면 onClose가 호출된다.", () => {
    const onClose = vi.fn();
    render(
      <Modal open={true} onClose={onClose}>
        {modalText}
      </Modal>
    );

    const backdrop = screen.getByTestId("modal-backdrop");
    expect(backdrop).toBeInTheDocument();

    if (backdrop) {
      fireEvent.click(backdrop);
      expect(onClose).toHaveBeenCalled();
    } else {
      fail("Backdrop 요소를 찾을 수 없습니다.");
    }
  });

  it("ModalContainer를 클릭해도 onClose가 호출되지 않는다.", () => {
    const onClose = vi.fn();
    render(
      <Modal open={true} onClose={onClose}>
        {modalText}
      </Modal>
    );

    const modalContainer = screen.getByTestId("modal-container");
    expect(modalContainer).toBeInTheDocument();

    if (modalContainer) {
      fireEvent.click(modalContainer);
      expect(onClose).not.toHaveBeenCalled();
    } else {
      fail("modalContainer 요소를 찾을 수 없습니다.");
    }
  });
});
