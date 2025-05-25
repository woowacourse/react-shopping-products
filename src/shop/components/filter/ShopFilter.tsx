import Dropdown, {
  DropdownOptionType,
} from '../../../components/common/Dropdown';
import Flex from '../../../components/common/Flex';

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
        selectedValue={filterOption.category}
        onSelectHandler={handleCategoryOption}
        aria-label="카테고리 선택"
        autoFocus={true}
      />
      <Dropdown
        options={[
          { label: '낮은 가격순', value: 'asc' },
          { label: '높은 가격순', value: 'desc' },
        ]}
        selectedValue={filterOption.sort}
        onSelectHandler={handleSortOption}
        aria-label="정렬 방식 선택"
      />
    </Flex>
  );
}

export default ShopFilter;
