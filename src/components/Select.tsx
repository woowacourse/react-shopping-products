import styled from '@emotion/styled';
import { useRef, useState } from 'react';
import useOutsideClick from '../hooks/useOutsideClick';
import SelectDownIcon from '/public/icon/select-down-icon.svg';
import { fadeIn } from '../animations/animations';

interface SelectProps<T> {
  options: T[];
  value: T;
  handleSelectedValue: (value: T) => void;
}

const Select = <T extends string | number>({
  options,
  value,
  handleSelectedValue,
}: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelectOption = (option: T) => {
    handleSelectedValue(option);
    setIsOpen(false);
  };

  const backgroundRef = useRef<HTMLDivElement>(null);
  useOutsideClick(backgroundRef, () => setIsOpen(false));

  const selectedValue: T = value ?? options[0];

  return (
    <SelectContainer ref={backgroundRef}>
      <SelectField onClick={() => setIsOpen(!isOpen)} $isOpen={isOpen}>
        <DefaultMessage>{selectedValue}</DefaultMessage>
        <SelectIcon src={SelectDownIcon} alt="옵션 열기" />
      </SelectField>
      {isOpen && (
        <OptionsContainer>
          {options.map((option) => (
            <OptionItem key={option} onClick={() => handleSelectOption(option)}>
              {option}
            </OptionItem>
          ))}
        </OptionsContainer>
      )}
    </SelectContainer>
  );
};

const SelectContainer = styled.div`
  width: 100%;
  max-width: 125px;
  cursor: pointer;
  position: relative;
`;

const SelectField = styled.div<{ $isOpen: boolean }>`
  width: 100%;
  border: 1px solid var(--color-gray);
  border-radius: 4px;
  padding: 8px;
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: ${({ $isOpen }) =>
    $isOpen ? '1px solid var(--color-black)' : '1px solid var(--color-grey)'};
`;

const SelectIcon = styled.img`
  width: 16px;
`;

const DefaultMessage = styled.p`
  font-size: var(--font-size-body);
`;

const OptionsContainer = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  color: var(--color-dark-grey);
  border: 1px solid var(--color-dark-grey);
  border-radius: 4px;
  box-sizing: border-box;
  position: absolute;
  top: calc(100% + 4px);
  animation: ${fadeIn} 0.3s ease;
`;

const OptionItem = styled.li`
  background-color: var(--color-white);
  font-size: var(--font-size-body);
  cursor: pointer;
  padding: 8px;
  box-sizing: border-box;
  &:hover {
    background-color: var(--color-grey);
  }
`;

export default Select;
