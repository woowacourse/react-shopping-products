import { vi } from "vitest";
vi.mock("../components/Spinner/Spinner");

import { render, cleanup } from "@testing-library/react";
import Spinner from "../components/Spinner/Spinner";

describe("Spinner를 모킹하면,", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("MockSpinner를 불러와야 한다", () => {
    // Spinner 컴포넌트가 MockSpinner로 대체되었는지 확인
    const { getByTestId } = render(<Spinner />);
    const spinner = getByTestId("loading-spinner");
    expect(spinner).toBeInTheDocument();
  });
});
