// import { vi, describe, it, afterEach } from "vitest";
// import { render } from "@testing-library/react";
// import { Modal } from "storybook/internal/components";

// describe("<Modal />", () => {
//   afterEach(() => {
//     vi.clearAllMocks();
//     vi.resetAllMocks();
//   });

//   it("모달이 닫힐 때 onClose가 호출된다", () => {
//     const onClose = vi.fn();
//     render(
//       <Modal isOpen={true} onClose={onClose}>
//         모달 내용
//       </Modal>
//     );

//     const closeButton = screen.getByRole("button", { name: /닫기/i });
//     userEvent.click(closeButton);

//     expect(onClose).toHaveBeenCalledTimes(1);
//   });

//   it("isOpen이 false일 때 모달이 렌더링되지 않는다", () => {
//     render(
//       <Modal isOpen={false} onClose={() => {}}>
//         모달 내용
//       </Modal>
//     );

//     expect(screen.queryByText("모달 내용")).not.toBeInTheDocument();
//   });

//   it("isOpen이 true일 때 모달이 렌더링된다", () => {
//     render(
//       <Modal isOpen={true} onClose={() => {}}>
//         모달 내용
//       </Modal>
//     );

//     expect(screen.getByText("모달 내용")).toBeInTheDocument();
//   });
// });
