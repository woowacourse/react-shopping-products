import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Dropdown from "../components/Dropdown/Dropdown";
import { mockList } from "../test-utils/mock-data";
vi.mock("@emotion/react");
describe("Dropdown은", () => {
  const mockOnSelect = vi.fn();

  it("아무것도 선택되지 않았을 때 선택하세요가 보여야 함", () => {
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

  it("선택하세요를 클릭하면 옵션들이 보여야 함", () => {
    render(
      <Dropdown
        list={mockList}
        value={null}
        onSelect={mockOnSelect}
        placeholder="선택하세요"
      />
    );

    fireEvent.click(screen.getByText("선택하세요"));

    expect(screen.getByText("옵션1")).toBeDefined();
    expect(screen.getByText("옵션2")).toBeDefined();
    expect(screen.getByText("옵션3")).toBeDefined();
  });

  it("옵션을 선택하면 onSelect가 호출되고 드롭다운이 닫혀야 함", () => {
    render(
      <Dropdown
        list={mockList}
        value={null}
        onSelect={mockOnSelect}
        placeholder="선택하세요"
      />
    );

    fireEvent.click(screen.getByText("선택하세요"));

    fireEvent.click(screen.getByText("옵션2"));

    expect(mockOnSelect).toHaveBeenCalledWith("옵션2");

    expect(screen.queryByText("옵션1")).toBeNull();
  });

  it("선택된 값이 표시되어야 함", () => {
    render(
      <Dropdown
        list={mockList}
        value="옵션3"
        onSelect={mockOnSelect}
        placeholder="선택하세요"
      />
    );

    expect(screen.getByText("옵션3")).toBeDefined();
  });
});
