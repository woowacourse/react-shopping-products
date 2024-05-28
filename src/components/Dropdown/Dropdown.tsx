import { useState } from 'react';
import UpIcon from '../../assets/UpIcon.svg';
import DownIcon from '../../assets/DownIcon.svg';
import * as S from '../Dropdown/Dropdown.style';

interface DropdownProps {
  options: string[];
  selectedOption: string;
  placeholder?: string;
  updateOption: (option: string) => void;
}

const Dropdown = ({ options, selectedOption, placeholder, updateOption }: DropdownProps) => {
  const [isOptionListOpen, setIsOptionListOpen] = useState(false);

  const toggleOptionList = () => setIsOptionListOpen((prev) => !prev);

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateOption(e.target.value);
    setIsOptionListOpen(false);
  };

  return (
    <S.Layout>
      <S.Container $isDefault={!selectedOption} onClick={toggleOptionList}>
        <p>{selectedOption || placeholder}</p>
        <img src={isOptionListOpen ? UpIcon : DownIcon} alt={isOptionListOpen ? '옵션 닫기' : '옵션 열기'} />
      </S.Container>
      {isOptionListOpen && (
        <S.OptionList>
          {options.map((option) => (
            <S.OptionItem key={option}>
              <input
                type="radio"
                id={option}
                value={option}
                checked={option === selectedOption}
                onChange={handleOptionChange}
              ></input>
              <S.OptionLabel htmlFor={option}>{option}</S.OptionLabel>
            </S.OptionItem>
          ))}
        </S.OptionList>
      )}
    </S.Layout>
  );
};

export default Dropdown;
