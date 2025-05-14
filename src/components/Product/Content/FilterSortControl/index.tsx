import { FILTER_OPTIONS, SORT_OPTIONS } from "../ProductContent.constant";
import { FilterOption, SortOption } from "../ProductContent.type";
import * as S from "./FilterSortControl.styled";
import Dropdown from "@/components/Dropdown";

interface FilterSortControlProps {
  filterOption: FilterOption;
  sortOption: SortOption;
  onFilterChange: (option: FilterOption) => void;
  onSortChange: (option: SortOption) => void;
}

function FilterSortControl({
  filterOption,
  sortOption,
  onFilterChange,
  onSortChange,
}: FilterSortControlProps) {
  return (
    <S.DropdownContainer>
      <S.DropdownWrapper>
        <Dropdown
          optionList={FILTER_OPTIONS}
          selectedOption={filterOption}
          onClick={onFilterChange}
        />
      </S.DropdownWrapper>
      <S.DropdownWrapper>
        <Dropdown
          optionList={SORT_OPTIONS}
          selectedOption={sortOption}
          onClick={onSortChange}
        />
      </S.DropdownWrapper>
    </S.DropdownContainer>
  );
}

export default FilterSortControl;
