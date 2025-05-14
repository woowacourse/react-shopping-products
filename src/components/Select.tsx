import styled from '@emotion/styled';
import { useRef, useState } from 'react';
import useOutsideClick from '../hooks/useOutsideClick';
import { keyframes } from '@emotion/react';
import SelectDownIcon from '/public/select-down.svg';

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

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

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
  animation: ${slideDown} 0.3s ease;
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
