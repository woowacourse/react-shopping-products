import { useState } from 'react';
import UpIcon from '../../assets/UpIcon.svg';
import DownIcon from '../../assets/DownIcon.svg';
import * as S from '../Dropdown/Dropdown.style';
import { Option } from '../../types/Option.type';
import { findByName } from '../../utils/option';

interface DropdownProps {
  options: Option[];
  selectedOption: Option;
  placeholder?: string;
  updateOption: (option: Option) => void;
}

const Dropdown = ({ options, selectedOption, placeholder, updateOption }: DropdownProps) => {
  const [isOptionListOpen, setIsOptionListOpen] = useState(false);

  const toggleOptionList = () => setIsOptionListOpen((prev) => !prev);

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newOption = findByName(e.target.value, options);

    if (newOption) {
      updateOption(newOption);
    }

    setIsOptionListOpen(false);
  };

  return (
    <S.Layout>
      <S.Container $isDefault={!selectedOption} onClick={toggleOptionList}>
        <p>{selectedOption.name || placeholder}</p>
        <img src={isOptionListOpen ? UpIcon : DownIcon} alt={isOptionListOpen ? '옵션 닫기' : '옵션 열기'} />
      </S.Container>
      {isOptionListOpen && (
        <S.OptionList>
          {options.map((option) => (
            <S.OptionItem key={option.key}>
              <input
                type="radio"
                id={option.key}
                value={option.name}
                checked={option === selectedOption}
                onChange={handleOptionChange}
              ></input>
              <S.OptionLabel htmlFor={option.key}>{option.name}</S.OptionLabel>
            </S.OptionItem>
          ))}
        </S.OptionList>
      )}
    </S.Layout>
  );
};

export default Dropdown;
