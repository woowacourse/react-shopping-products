import { DropdownButton, DropdownItem } from './Dropdown.style';

interface DropdownProps {
  options: [string, string][];
  onchange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onchange }) => {
  return (
    <DropdownButton onChange={onchange}>
      {options.map(([key, value]) => (
        <DropdownItem value={key} key={key}>
          {value}
        </DropdownItem>
      ))}
    </DropdownButton>
  );
};
export default Dropdown;
