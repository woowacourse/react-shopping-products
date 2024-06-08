import { CATEGORY } from '@/constants/index';
import { Dropdown } from '@/components/index';

interface CategoryDropdownProps {
  changeCategory: (category: string) => void;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  changeCategory: changeSorting,
}) => {
  return (
    <Dropdown
      onchange={(e: React.ChangeEvent<HTMLSelectElement>) => {
        changeSorting(e.target.value);
      }}
      options={Object.entries(CATEGORY)}
    ></Dropdown>
  );
};

export default CategoryDropdown;
