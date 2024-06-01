import { DropdownButton, DropdownItem } from './Dropdown.style';
import { DropdownProps } from './Dropdown.type';

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
