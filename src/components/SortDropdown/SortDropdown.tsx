import { SORT } from '@/constants/index';
import { Dropdown } from '@/components/index';

interface SortDropdownProps {
  changeSorting: (category: string) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ changeSorting }) => {
  return (
    <Dropdown
      onchange={(e: React.ChangeEvent<HTMLSelectElement>) => {
        changeSorting(e.target.value);
      }}
      options={Object.entries(SORT)}
    ></Dropdown>
  );
};

export default SortDropdown;
