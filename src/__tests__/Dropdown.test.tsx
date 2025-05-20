import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Dropdown from "../components/Dropdown/Dropdown";
import { mockList } from "../test-utils/mock-data";
// Needed for the css prop to work
vi.mock("@emotion/react", () => ({
  jsx: (
    type: React.ElementType,
    props: Record<string, unknown>,
    ...children: React.ReactNode[]
  ) => {
    return React.createElement(
      type,
      { ...props, className: "emotion-class" },
      ...children
    );
  },
  css: () => ({ name: "mock-css-result" }),
}));

describe("Dropdown", () => {
  const mockOnSelect = vi.fn();

  it("renders with placeholder when no value is selected", () => {
    render(
      <Dropdown
        list={mockList}
        value={null}
        onSelect={mockOnSelect}
        placeholder="선택하세요"
      />
    );

    expect(screen.getByText("선택하세요")).toBeDefined();
  });

  it("displays dropdown options when clicked", () => {
    render(
      <Dropdown
        list={mockList}
        value={null}
        onSelect={mockOnSelect}
        placeholder="선택하세요"
      />
    );

    // 드롭다운 버튼 클릭
    fireEvent.click(screen.getByText("선택하세요"));

    // 옵션들이 표시되는지 확인
    expect(screen.getByText("옵션1")).toBeDefined();
    expect(screen.getByText("옵션2")).toBeDefined();
    expect(screen.getByText("옵션3")).toBeDefined();
  });

  it("calls onSelect and closes dropdown when an option is selected", () => {
    render(
      <Dropdown
        list={mockList}
        value={null}
        onSelect={mockOnSelect}
        placeholder="선택하세요"
      />
    );

    // 드롭다운 열기
    fireEvent.click(screen.getByText("선택하세요"));

    // 옵션 선택
    fireEvent.click(screen.getByText("옵션2"));

    // onSelect가 호출되었는지 확인
    expect(mockOnSelect).toHaveBeenCalledWith("옵션2");

    // 드롭다운이 닫혔는지 확인 (옵션이 더 이상 보이지 않아야 함)
    expect(screen.queryByText("옵션1")).toBeNull();
  });

  it("displays the selected value", () => {
    render(
      <Dropdown
        list={mockList}
        value="옵션3"
        onSelect={mockOnSelect}
        placeholder="선택하세요"
      />
    );

    // 선택된 값이 표시되는지 확인
    expect(screen.getByText("옵션3")).toBeDefined();
  });
});
