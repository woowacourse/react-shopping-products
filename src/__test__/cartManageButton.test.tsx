// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { ToastProvider } from "../provider/ToastProvider";
import { DataProvider } from "../provider/DataProvider";
import "@testing-library/jest-dom";
import App from "../App";

describe("CartManageButton 컴포넌트", () => {
  it("초기 수량이 표시되고, + 버튼 클릭 시 수량이 증가한다", async () => {
    render(
      <DataProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </DataProvider>
    );

    const addTexts = await screen.findAllByText("담기");
    const addButton = addTexts[0].closest("button");

    await userEvent.click(addButton!);

    const plusButton = screen.getAllByRole("button", { name: "+" });
    await userEvent.click(plusButton[0]);

    expect(await screen.findByText("2")).toBeInTheDocument();
  });

  it("- 버튼 클릭 시 수량이 감소한다", async () => {
    render(
      <DataProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </DataProvider>
    );

    const addTexts = await screen.findAllByText("담기");
    const addButton = addTexts[0].closest("button");
    const productContainer = screen.getByText("bpple 상품 목록").closest("div");

    await userEvent.click(addButton!);

    const plusButton = screen.getAllByRole("button", { name: "+" });
    await userEvent.click(plusButton[0]);
    await userEvent.click(plusButton[0]);

    expect(await screen.findByText("3")).toBeInTheDocument();

    const minusButton = screen.getAllByRole("button", { name: "-" });
    await userEvent.click(minusButton[0]);

    expect(await within(productContainer!).findByText("2")).toBeInTheDocument();
  });
});
