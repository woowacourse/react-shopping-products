import { ChangeEvent } from 'react';
import { Container } from './Dropdown.styles';
import { SortKeyType } from '../../../types/type';

interface DropdownProps {
  value: string;
  placeholder?: string;
  options: readonly string[];
  // onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onChange: (value: SortKeyType) => void;
}

function Dropdown({ value, placeholder, options, onChange }: DropdownProps) {
  return (
    <Container
      value={value}
      onChange={(e) => onChange(e.target.value as SortKeyType)}
    >
      {placeholder && (
        <option value="" disabled={!value}>
          {placeholder}
        </option>
      )}
      {options.map((option, index) => {
        return (
          <option key={index} value={option}>
            {option}
          </option>
        );
      })}
    </Container>
  );
}

export default Dropdown;
