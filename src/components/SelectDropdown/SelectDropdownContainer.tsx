import SelectDropdown from './SelectDropdown';
import * as S from './SelectDropdown.styled';
import {
  CategoryKey,
  SortKey,
  CATEGORIES,
  SORTS,
  CATEGORY_LABELS,
  SORT_LABELS,
  getCategoryKeyByLabel,
  getSortKeyByLabel,
} from '../../types/selectOptions';

type SelectDropdownContainerProps = {
  category: CategoryKey;
  sort: SortKey;
  handleCategoryChange: (category: CategoryKey) => void;
  handleSortChange: (sort: SortKey) => void;
};

const SelectDropdownContainer = ({
  category,
  sort,
  handleCategoryChange,
  handleSortChange,
}: SelectDropdownContainerProps) => {
  const handleCategorySelect = (label: string) => {
    const key = getCategoryKeyByLabel(label);
    if (key) handleCategoryChange(key);
  };

  const handleSortSelect = (label: string) => {
    const key = getSortKeyByLabel(label);
    if (key) handleSortChange(key);
  };

  return (
    <>
      <S.Header>bpple 상품 목록</S.Header>
      <S.Container>
        <SelectDropdown
          title={CATEGORIES[category].label}
          options={CATEGORY_LABELS}
          onSelect={handleCategorySelect}
        />
        <SelectDropdown
          title={SORTS[sort].label}
          options={SORT_LABELS}
          onSelect={handleSortSelect}
        />
      </S.Container>
    </>
  );
};

export default SelectDropdownContainer;
