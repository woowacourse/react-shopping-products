import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import TopArrow from "../icons/TopArrow";

interface SelectProps<T> {
  options: T[];
  selectedItem: T;
  setSelectedItem: React.Dispatch<React.SetStateAction<T>>;
}

const Select = <T extends string>({ options, selectedItem, setSelectedItem }: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleSelect = (item: T) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div css={selectStyle} ref={selectRef}>
      <button type="button" css={labelStyle(isOpen)} onClick={() => setIsOpen((prev) => !prev)}>
        {selectedItem}
        {isOpen ? <TopArrow style={{ transform: "rotate(180deg)" }} /> : <TopArrow />}
      </button>
      {isOpen && (
        <ul css={optionListStyle}>
          {options.map((option, idx) => (
            <li key={idx} css={optionItemStyle} onClick={() => handleSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;

const selectStyle = css`
  position: relative;
  width: 100%;
  font-size: 10.629px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.615px;
`;

const labelStyle = (isOpen: boolean) => css`
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: transparent;
  width: 100%;
  border: solid 1.01px ${isOpen ? "#000000" : "#acacac"};
  border-radius: 8px;
  padding: 8px;
  box-sizing: border-box;
  cursor: pointer;
  color: #000000;
  font-size: 10.629px;
`;

const optionListStyle = css`
  position: absolute;
  width: 100%;
  top: 40px;
  left: 0;
  list-style: none;
  padding: 0;
  margin: 0;
  border-radius: 5.315px;
  border: 1px solid #acacac;
  background: #fff;
  z-index: 10;
  box-sizing: border-box;
`;

const optionItemStyle = css`
  color: #4f4f4f;
  padding: 8px 10px;
  cursor: pointer;
  border-radius: 5.315px;

  &:hover {
    background: #e9e9e9;
  }
`;
