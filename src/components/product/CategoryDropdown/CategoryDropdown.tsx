import Dropdown from '@components/common/Dropdown/Dropdown';
import { PRODUCT_CATEGORY_MAP } from '@components/product/CategoryDropdown/CategoryDropdown.constant';
import { isValidCategory } from '@components/product/CategoryDropdown/CategoryDropdown.util';

export interface CategoryDropdownProps {
  isOpen: boolean;
  category: keyof typeof PRODUCT_CATEGORY_MAP;
  onToggleDropdown: () => void;
  onSelectCategoryOption: (value: keyof typeof PRODUCT_CATEGORY_MAP) => void;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  isOpen,
  category,
  onToggleDropdown,
  onSelectCategoryOption,
}) => {
  const targetCategory = category ? PRODUCT_CATEGORY_MAP[category] : '';

  const onSelectOption = (category: keyof typeof PRODUCT_CATEGORY_MAP) => {
    onSelectCategoryOption(category);
    onToggleDropdown();
  };

  return (
    <Dropdown isOpen={isOpen} onToggleDropdown={onToggleDropdown}>
      <Dropdown.Trigger value={targetCategory} placeholder="" />
      <Dropdown.Menu>
        {Object.entries(PRODUCT_CATEGORY_MAP).map(([categoryKey, categoryValue]) => (
          <Dropdown.Option
            key={categoryKey}
            isSelected={category === categoryKey}
            onSelectOption={() => {
              if (isValidCategory(categoryKey)) onSelectOption(categoryKey);
            }}
          >
            {categoryValue}
          </Dropdown.Option>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CategoryDropdown;
