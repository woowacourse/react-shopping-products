import { useEffect, useRef, useState } from 'react';
import { LowerArrow, UpperArrow } from '../Arrows';
import * as S from './style';

interface DropdownProps {
  size: S.Size;
  value: string;
  options: string[];
  onSelect: (value: string) => void;
}

const Dropdown = ({ size, value, options, onSelect }: DropdownProps) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdownClick = () => {
    setIsOpened((prev) => !prev);
  };

  const handleOptionSelect = (value: string) => {
    onSelect(value);
    setIsOpened(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <S.Container ref={dropdownRef}>
      <S.Dropdown size={size} onClick={handleDropdownClick}>
        <S.DropdownText selectedOption={value}>
          {value === '' ? '전체' : value}
        </S.DropdownText>
        {isOpened ? <UpperArrow /> : <LowerArrow />}
      </S.Dropdown>
      {isOpened && (
        <S.OptionContainer size={size}>
          {options.map((option, index) => {
            return (
              <S.Option
                key={index}
                id={option}
                onClick={(e) =>
                  handleOptionSelect((e.target as HTMLButtonElement).id)
                }
              >
                {option}
              </S.Option>
            );
          })}
        </S.OptionContainer>
      )}
    </S.Container>
  );
};

export default Dropdown;
