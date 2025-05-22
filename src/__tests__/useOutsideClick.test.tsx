import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { fireEvent } from "@testing-library/react";

describe("useOutsideClick 훅은", () => {
  it("바깥을 클릭했을때, 해당 콜백이 호출되어야 한다.", () => {
    // Setup a mock callback function
    const mockCallback = vi.fn();

    // Create a div that will serve as our reference element
    const div = document.createElement("div");
    document.body.appendChild(div);

    // Render the hook with our mock callback and reference element
    const { result } = renderHook(() => useOutsideClick(mockCallback));

    // Set up the ref to point to our div
    Object.defineProperty(result.current, "current", {
      value: div,
    });

    // Create another element that's outside our ref element
    const outsideElement = document.createElement("button");
    document.body.appendChild(outsideElement);

    // Simulate a click inside the ref element
    fireEvent.mouseDown(div);

    // The callback should not be called
    expect(mockCallback).not.toHaveBeenCalled();

    // Simulate a click outside the ref element
    fireEvent.mouseDown(outsideElement);

    // The callback should be called
    expect(mockCallback).toHaveBeenCalledTimes(1);

    // Clean up
    document.body.removeChild(div);
    document.body.removeChild(outsideElement);
  });

  it("should not call the callback when clicking inside the referenced element", () => {
    // Setup a mock callback function
    const mockCallback = vi.fn();

    // Create a div that will serve as our reference element
    const div = document.createElement("div");
    // Add a child element to test clicking inside
    const childElement = document.createElement("span");
    div.appendChild(childElement);
    document.body.appendChild(div);

    // Render the hook with our mock callback and reference element
    const { result } = renderHook(() => useOutsideClick(mockCallback));

    // Set up the ref to point to our div
    Object.defineProperty(result.current, "current", {
      value: div,
    });

    // Simulate a click inside the child element
    fireEvent.mouseDown(childElement);

    // The callback should not be called
    expect(mockCallback).not.toHaveBeenCalled();

    // Clean up
    document.body.removeChild(div);
  });
});
