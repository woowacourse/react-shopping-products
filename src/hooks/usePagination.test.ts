import { act, renderHook } from "@testing-library/react";
import usePagination from "./usePagination";

describe("usePagination", () => {
  describe("페이지네이션", () => {
    it("첫 페이지를 로딩할 때, 페이지 번호가 1이고 마지막 페이지가 아니다.", () => {
      const { result } = renderHook(() => usePagination());

      expect(result.current.page).toBe(1);
      expect(result.current.isLastPage).toBeFalsy();
    });

    it("handleLastPage 함수를 호출하여 true 값을 전달하면, 현재 페이지를 마지막 페이지로 설정할 수 있다.", () => {
      const { result } = renderHook(() => usePagination());

      act(() => {
        result.current.handleLastPage(true);
      });

      expect(result.current.isLastPage).toBeTruthy();
    });

    it("resetPage 함수를 호출하면 page와 isLastPage가 초기 상태로 돌아간다.", () => {
      const { result } = renderHook(() => usePagination());

      act(() => {
        result.current.resetPage();
      });

      expect(result.current.page).toBe(1);
      expect(result.current.isLastPage).toBe(false);
    });
  });
});
