import { Flex } from '@/components/common';
import Dropdown from '@/components/common/Dropdown';
import { DropdownOptionType } from '@/components/common/type';

function ShopFilter({
  filterOption,
  handleCategoryOption,
  handleSortOption,
}: {
  filterOption: { category: DropdownOptionType; sort: DropdownOptionType };
  handleCategoryOption: (option: DropdownOptionType) => void;
  handleSortOption: (option: DropdownOptionType) => void;
}) {
  return (
    <Flex flexDirection="row" justifyContent="space-between">
      <Dropdown
        options={[
          { label: '전체', value: '전체' },
          { label: '식료품', value: '식료품' },
          { label: '패션잡화', value: '패션잡화' },
        ]}
        selectedOption={filterOption.category}
        onSelectOption={handleCategoryOption}
        data-testid="filter-category"
      />
      <Dropdown
        options={[
          { label: '낮은 가격순', value: 'asc' },
          { label: '높은 가격순', value: 'desc' },
        ]}
        selectedOption={filterOption.sort}
        onSelectOption={handleSortOption}
        data-testid="filter-sort"
      />
    </Flex>
  );
}

export default ShopFilter;
