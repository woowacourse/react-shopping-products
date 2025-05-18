import * as S from './Select.styles';
import { useRef, useState } from 'react';
import useOutsideClick from '../../hooks/useOutsideClick';
import SelectDownIcon from '/public/icon/select-down-icon.svg';

interface SelectProps {
  options: string[];
  value: string;
  handleSelectedValue: (value: string) => void;
}

const Select = ({ options, value, handleSelectedValue }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const handleSelectOption = (option: string) => {
    handleSelectedValue(option);
    setIsOpen(false);
  };

  const backgroundRef = useRef<HTMLDivElement>(null);
  useOutsideClick(backgroundRef, () => setIsOpen(false));

  const handleSelectKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.stopPropagation();
      e.preventDefault();
      if (isOpen) {
        handleSelectOption(options[focusedIndex]);
        return;
      }
      setIsOpen(!isOpen);
    }
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex(Math.min(focusedIndex + 1, options.length - 1));
      setIsOpen(true);
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex(Math.max(focusedIndex - 1, 0));
      setIsOpen(true);
    }
    if (e.key === 'Tab') {
      setIsOpen(false);
    }
  };

  const selectedValue = value.length !== 0 ? value : options[0];

  return (
    <S.SelectContainer ref={backgroundRef}>
      <S.SelectField
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-activedescendant={isOpen ? `option-${options[focusedIndex]}` : undefined}
        aria-labelledby={options[0]}
        onClick={() => setIsOpen(!isOpen)}
        $isOpen={isOpen}
        tabIndex={0}
        onKeyDown={handleSelectKeyDown}
      >
        <S.DefaultMessage>{selectedValue}</S.DefaultMessage>
        <S.SelectIcon src={SelectDownIcon} alt="옵션 열기" />
      </S.SelectField>
      {isOpen && (
        <S.OptionsContainer role="listbox">
          {options.map((option, index) => (
            <S.OptionItem
              id={`option-${option}`}
              key={option}
              role="option"
              onClick={() => handleSelectOption(option)}
              aria-selected={option === selectedValue}
              $isFocused={focusedIndex === index}
            >
              {option}
            </S.OptionItem>
          ))}
        </S.OptionsContainer>
      )}
    </S.SelectContainer>
  );
};

export default Select;
