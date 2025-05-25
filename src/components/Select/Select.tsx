import { useEffect, useRef, useState } from "react";
import * as S from "./Select.styles";
import { TopArrowIcon } from "@/components/icons";

interface SelectProps<T> {
  options: readonly T[];
  selectedItem: T;
  setSelectedItem: React.Dispatch<React.SetStateAction<T>>;
}

export default function Select<T extends string>({ options, selectedItem, setSelectedItem }: SelectProps<T>) {
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
    <S.SelectWrapper ref={selectRef}>
      <S.Label isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)}>
        {selectedItem}
        {isOpen ? <TopArrowIcon style={{ transform: "rotate(180deg)" }} /> : <TopArrowIcon />}
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
}
