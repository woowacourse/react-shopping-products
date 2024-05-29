import { DropdownButton, DropdownItem } from './Dropdown.style';

interface DropdownProps {
  options: string[];
  onChange: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onChange }) => {
  return (
    <DropdownButton onChange={onChange}>
      {options.map((option) => (
        <DropdownItem>{option}</DropdownItem>
      ))}
    </DropdownButton>
  );
};
export default Dropdown;
