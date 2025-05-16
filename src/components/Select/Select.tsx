import { useEffect, useRef, useState } from "react";
import { TopArrow } from "../icons";
import * as S from "./Select.styles";

interface SelectProps<T> {
  options: readonly T[];
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

  // 외부 클릭 시 닫기
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
    <S.SelectWrapper ref={selectRef}>
      <S.Label isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)}>
        {selectedItem}
        {isOpen ? <TopArrow style={{ transform: "rotate(180deg)" }} /> : <TopArrow />}
      </S.Label>
      {isOpen && (
        <S.OptionList>
          {options.map((option, idx) => (
            <S.OptionItem key={idx} onClick={() => handleSelect(option)}>
              {option}
            </S.OptionItem>
          ))}
        </S.OptionList>
      )}
    </S.SelectWrapper>
  );
};

export default Select;
