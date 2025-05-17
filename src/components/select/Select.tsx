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

  const handleSelectOption = (option: string) => {
    handleSelectedValue(option);
    setIsOpen(false);
  };

  const backgroundRef = useRef<HTMLDivElement>(null);
  useOutsideClick(backgroundRef, () => setIsOpen(false));

  const selectedValue = value.length !== 0 ? value : options[0];

  return (
    <S.SelectContainer ref={backgroundRef}>
      <S.SelectField onClick={() => setIsOpen(!isOpen)} $isOpen={isOpen}>
        <S.DefaultMessage>{selectedValue}</S.DefaultMessage>
        <S.SelectIcon src={SelectDownIcon} alt="옵션 열기" />
      </S.SelectField>
      {isOpen && (
        <S.OptionsContainer>
          {options.map((option) => (
            <S.OptionItem key={option} onClick={() => handleSelectOption(option)}>
              {option}
            </S.OptionItem>
          ))}
        </S.OptionsContainer>
      )}
    </S.SelectContainer>
  );
};

export default Select;
