import { ComponentProps, useEffect, useRef, useState } from "react";
import {
  DropDownContainer,
  DropDownDefault,
  DropDownIcon,
  DropDownOptions,
  SelectorContainer,
} from "./Selector.style";

interface SelectorProps<T> extends ComponentProps<"button"> {
  dropDownOptions: T[];
  placeholder: string;
  onSelectChange: (value: T) => void;
}

function Selector<T>({
  dropDownOptions,
  placeholder,
  onSelectChange,
  ref,
}: SelectorProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>(placeholder);
  const [focusIndex, setFocusIndex] = useState(0);
  const divRef = useRef<(HTMLLIElement | null)[]>([]);

  const handleSelectedOption = (
    e: React.MouseEvent<HTMLUListElement> | React.KeyboardEvent
  ) => {
    const targetId = (e.target as HTMLDivElement).id;
    setSelectedValue(targetId);
    setIsOpen(false);
    onSelectChange(targetId as T);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const target = e.target as HTMLUListElement | HTMLButtonElement;
    if (e.key === "ArrowDown") {
      setFocusIndex((prev) => Math.min(dropDownOptions.length, prev + 1));
    } else if (e.key === "ArrowUp") {
      setFocusIndex((prev) => Math.max(0, prev - 1));
    } else if (e.key === "Enter" && !(target instanceof HTMLButtonElement)) {
      handleSelectedOption(e);
    }
  };

  useEffect(() => {
    divRef.current[focusIndex]?.focus();
  }, [focusIndex]);

  return (
    <div css={SelectorContainer}>
      <button
        css={DropDownDefault(isOpen)}
        ref={ref}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        type="button"
      >
        {selectedValue}
      </button>
      <img
        css={DropDownIcon}
        src={`./${!isOpen ? "chevron-up" : "chevron-down"}.png`}
      />
      {isOpen && (
        <ul css={DropDownContainer} onClick={(e) => handleSelectedOption(e)}>
          {dropDownOptions.map((option, index) => (
            <li
              css={DropDownOptions}
              key={index}
              id={option as string}
              tabIndex={-1}
              ref={(el) => {
                divRef.current[index] = el;
              }}
              onKeyDown={handleKeyDown}
            >
              {option as string}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Selector;
