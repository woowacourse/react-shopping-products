import { ChangeEvent } from 'react';
import { Container } from './Dropdown.styles';

interface DropdownProps {
  value: string;
  placeholder: string;
  options: string[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

function Dropdown({ value, placeholder, options, onChange }: DropdownProps) {
  return (
    <Container value={value} onChange={onChange}>
      {placeholder && (
        <option value="" disabled={value !== ''}>
          {placeholder}
        </option>
      )}
      {options.map((option) => {
        return (
          <option key={option} value={option}>
            {option}
          </option>
        );
      })}
    </Container>
  );
}

export default Dropdown;
