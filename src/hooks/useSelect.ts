import { MouseEventHandler, useState } from "react";

const useSelect = (initialSelected?: string) => {
  const [isDropdown, setIsDropdown] = useState(false);
  const [selected, setSelected] = useState<string | undefined>(initialSelected);

  const handleDropdown: MouseEventHandler<HTMLUListElement> = (e) => {
    if (e.target !== e.currentTarget) return;

    setIsDropdown((prevState) => !prevState);
  };

  const handleSelected: MouseEventHandler<HTMLLIElement> = (e) => {
    if (e.target !== e.currentTarget) return;

    const { textContent } = e.currentTarget;
    if (!textContent) return;

    setSelected(textContent);
    setIsDropdown(false);
  };

  return { isDropdown, handleDropdown, selected, handleSelected };
};

export default useSelect;
