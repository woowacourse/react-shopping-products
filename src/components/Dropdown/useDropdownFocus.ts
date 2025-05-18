import { type KeyboardEvent, useState } from "react";

interface UseDropdownFocusParams<T> {
  optionList: readonly T[];
  selectOption: (option: T) => void;
  closeDropdown: () => void;
}

const useDropdownFocus = <T>({
  optionList,
  selectOption,
  closeDropdown,
}: UseDropdownFocusParams<T>) => {
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const handleDropdownKeyDown = (e: KeyboardEvent) => {
    e.preventDefault();
    switch (e.key) {
      case "ArrowDown":
        setFocusedIndex((prev) => Math.min(prev + 1, optionList.length - 1));
        break;
      case "ArrowUp":
        setFocusedIndex((prev) => Math.max(prev - 1, 0));
        break;
      case "Enter":
        if (focusedIndex >= 0) {
          selectOption(optionList[focusedIndex]);
        }
        break;
      case "Escape":
        setFocusedIndex(-1);
        closeDropdown();
        break;
    }
  };

  return { focusedIndex, handleDropdownKeyDown };
};

export default useDropdownFocus;
