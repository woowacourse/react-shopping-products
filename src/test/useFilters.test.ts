import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { ChangeEvent } from "react";
import { useFilters } from "@/hooks";

describe("useFilters", () => {
  it("handleCategoryChange의 value에 books를 넣으면 category가 books로 변경된다.", () => {
    const { result } = renderHook(() => useFilters());

    const event = {
      target: { value: "books" },
    } as ChangeEvent<HTMLSelectElement>;

    act(() => {
      result.current.handleCategoryChange(event);
    });

    expect(result.current.category).toBe("books");
  });

  it("handleCategoryChange의 value에 잘못된 값을 넣으면 category는 값이 바뀌지 않고 초기값인 all을 그대로 유지한다", () => {
    const { result } = renderHook(() => useFilters());

    const event = {
      target: { value: "invalidCategory" },
    } as ChangeEvent<HTMLSelectElement>;

    act(() => {
      result.current.handleCategoryChange(event);
    });

    expect(result.current.category).toBe("all");
  });

  it("handleSortChange value에 price,id,desc를 넣으면 sort가 price,id,desc로 변경된다.", () => {
    const { result } = renderHook(() => useFilters());

    const event = {
      target: { value: "price,id,desc" },
    } as ChangeEvent<HTMLSelectElement>;

    act(() => {
      result.current.handleSortChange(event);
    });

    expect(result.current.sort).toBe("price,id,desc");
  });

  it("handleSortChange value에 잘못된 값을 넣으면 sort는 값이 바뀌지 않고 초기값인 price,id,asc을 그대로 유지한다", () => {
    const { result } = renderHook(() => useFilters());

    const event = {
      target: { value: "invalidSort" },
    } as ChangeEvent<HTMLSelectElement>;

    act(() => {
      result.current.handleSortChange(event);
    });

    expect(result.current.sort).toBe("price,id,asc");
  });
});
