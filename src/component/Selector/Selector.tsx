import { ComponentProps, useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";

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

const DropDownIcon = css`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 16px;
`;

const DropDownOptions = css`
  font-family: Inter;
  font-weight: 400;
  font-size: 10.63px;
  color: #4f4f4f;
  padding: 8px;

  &:hover,
  &:focus {
    background-color: #f3f3f3;
    cursor: pointer;
    outline: none;
  }
`;

const DropDownDefault = (isOpen: boolean) => {
  const borderColor = isOpen ? "#000" : "#acacac";
  const color = "#000";

  return css`
    display: flex;
    background-color: white;
    padding: 10px;
    width: 100%;
    border: 1px solid #acacac;
    border-color: ${borderColor};
    color: ${color};
    box-sizing: border-box;
    border-radius: 4px;
    font-family: Inter;
    font-weight: 400;
    font-size: 10px;
  `;
};

const DropDownContainer = css`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  top: 36px;
  border: 1px solid #acacac;
  border-radius: 5px;
  background-color: white;
  list-style-type: none;
`;

const SelectorContainer = css`
  position: relative;
`;

export default Selector;
