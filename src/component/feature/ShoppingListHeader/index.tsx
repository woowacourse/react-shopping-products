import Text from '../../@common/Text';
import Dropdown from '../../@common/Dropdown';
import ArrowIcon from '../../@common/ArrowIcon';
import { CategoryOption, SortOption } from '../../../types/common';
import {
  headerContainerStyle,
  filterContainerStyle,
  filterItemStyle,
} from './ShoppingListHeader.styles';

interface ShoppingListHeaderProps {
  category: CategoryOption;
  selected: SortOption;
  handleCategoryClick: (category: string) => void;
  handleSortClick: (option: string) => void;
}

const ShoppingListHeader = ({
  category,
  selected,
  handleCategoryClick,
  handleSortClick,
}: ShoppingListHeaderProps) => {
  const categoryOptions: CategoryOption[] = ['전체', '패션잡화', '식료품'];
  const sortOptions: SortOption[] = ['높은 가격순', '낮은 가격순'];

  return (
    <div css={headerContainerStyle}>
      <Text variant="title">bpple 상품 목록</Text>
      <div css={filterContainerStyle}>
        <div css={filterItemStyle}>
          <Dropdown.Root>
            <Dropdown.Trigger>
              {category}
              <ArrowIcon />
            </Dropdown.Trigger>
            <Dropdown.List>
              {categoryOptions.map((option) => (
                <Dropdown.Item
                  key={option}
                  handleClick={handleCategoryClick}
                  content={option}
                />
              ))}
            </Dropdown.List>
          </Dropdown.Root>
        </div>
        <div css={filterItemStyle}>
          <Dropdown.Root>
            <Dropdown.Trigger>
              {selected}
              <ArrowIcon />
            </Dropdown.Trigger>
            <Dropdown.List>
              {sortOptions.map((option) => (
                <Dropdown.Item
                  key={option}
                  handleClick={handleSortClick}
                  content={option}
                />
              ))}
            </Dropdown.List>
          </Dropdown.Root>
        </div>
      </div>
    </div>
  );
};

export default ShoppingListHeader;
