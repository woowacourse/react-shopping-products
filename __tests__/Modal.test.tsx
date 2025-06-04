import React from "react";
import { vi, describe, it, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "../src/Component/Common/Modal";

describe("<Modal />", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it("모달이 닫힐 때 onClose가 호출된다", async () => {
    const onClose = vi.fn();
    render(
      <Modal
        isModalOpen={true}
        onClose={onClose}
        cartItems={[]}
        cartStatus="success"
        refetchCart={() => {}}
      >
        모달 내용
      </Modal>
    );

    const closeButton = await screen.findByRole("button", { name: /닫기/i });
    await userEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("isModalOpen이 false일 때 모달이 렌더링되지 않는다", () => {
    render(
      <Modal
        isModalOpen={false}
        onClose={() => {}}
        cartItems={[]}
        cartStatus="success"
        refetchCart={() => {}}
      >
        모달 내용
      </Modal>
    );
    expect(screen.queryByText("총 결제 금액")).not.toBeInTheDocument();
  });

  it("isModalOpen이 true일 때 모달이 렌더링된다", () => {
    render(
      <Modal
        isModalOpen={true}
        onClose={() => {}}
        cartItems={[]}
        cartStatus="success"
        refetchCart={() => {}}
      >
        모달 내용
      </Modal>
    );
    expect(screen.queryByText("총 결제 금액")).toBeInTheDocument();
  });
});
