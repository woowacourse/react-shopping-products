import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ErrorToast from "../components/ErrorToast/ErrorToast";
import React from "react";

describe("ErrorToast 컴포넌트", () => {
  test("에러 메시지가 화면에 표시되어야 함", () => {
    const testError = new Error("테스트 에러 메시지");

    render(<ErrorToast error={testError} />);

    expect(screen.getByText("테스트 에러 메시지")).toBeInTheDocument();
  });
});
