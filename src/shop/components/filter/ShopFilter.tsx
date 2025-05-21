import { Flex } from '@/components/common';
import Dropdown from '@/components/common/Dropdown';

const categoryOptions = [
  { label: '전체', value: '전체' },
  { label: '식료품', value: '식료품' },
  { label: '패션잡화', value: '패션잡화' },
];

const sortOptions = [
  { label: '낮은 가격순', value: 'asc' },
  { label: '높은 가격순', value: 'desc' },
];

function ShopFilter({
  filter,
  handleCategoryOption,
  handleSortOption,
}: {
  filter: { category: string; sort: string };
  handleCategoryOption: (value: string) => void;
  handleSortOption: (value: string) => void;
}) {
  return (
    <Flex flexDirection="row" justifyContent="space-between">
      <Dropdown
        options={categoryOptions}
        selectedValue={filter.category}
        onSelectOption={handleCategoryOption}
        data-testid="filter-category"
      />
      <Dropdown
        options={sortOptions}
        selectedValue={filter.sort}
        onSelectOption={handleSortOption}
        data-testid="filter-sort"
      />
    </Flex>
  );
}

export default ShopFilter;
