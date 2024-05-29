import { useState } from 'react';
import * as Styled from './SelectBox.style';

interface SelectBoxProps<T> {
  optionValues: string[];
  placeholder: T;
  autoFocus?: boolean;
  onChange: (value: T) => void;
}

export default function SelectBox<T extends string>({
  optionValues,
  placeholder,
  autoFocus,
  onChange,
}: SelectBoxProps<T>) {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedValue, setSelectedValue] = useState<T>(placeholder);

  const handleOptionBox = () => setIsOpened((prevState) => !prevState);

  const handleOptionValue = (value: T) => {
    setSelectedValue(value);
    onChange(value);
    handleOptionBox();
  };

  return (
    <Styled.SelectBoxContainer>
      <Styled.SelectButton
        $isOpened={isOpened}
        $isSelected={selectedValue !== ''}
        onClick={handleOptionBox}
        autoFocus={autoFocus ?? false}
      >
        {selectedValue}
      </Styled.SelectButton>
      {isOpened && (
        <Styled.SelectOptionBox>
          {optionValues.map((value) => {
            return (
              <Styled.SelectOption
                key={value}
                $isSelected={value === selectedValue}
                onClick={() => handleOptionValue(value as T)}
              >
                {value}
              </Styled.SelectOption>
            );
          })}
        </Styled.SelectOptionBox>
      )}
    </Styled.SelectBoxContainer>
  );
}
