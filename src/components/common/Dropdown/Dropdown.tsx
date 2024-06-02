import * as Styled from './Dropdown.styled';

export interface DropdownProps<T extends string> {
  isOpen: boolean;
  nowSelectedOption: T;
  options: T[];
  setOption: (option: T) => void;
  setIsOpen: (boolean: boolean) => void;
}

function Dropdown<T extends string>({
  isOpen,
  nowSelectedOption,
  options,
  setOption,
  setIsOpen,
}: DropdownProps<T>) {
  return (
    <Styled.DropdownContainer onClick={() => setIsOpen(!isOpen)}>
      <Styled.Trigger isOpen={isOpen}>
        {nowSelectedOption}
        <Styled.Arrow isOpen={isOpen} />
      </Styled.Trigger>
      {isOpen && (
        <Styled.OptionContainer isOpen={isOpen}>
          {options.map(option => (
            <Styled.Option
              key={option}
              isSelected={nowSelectedOption === option}
              onClick={() => setOption(option)}
            >
              {option}
            </Styled.Option>
          ))}
        </Styled.OptionContainer>
      )}
    </Styled.DropdownContainer>
  );
}

export default Dropdown;
