import { CATEGORY } from '../../constants/categories';
import { SORT } from '../../constants/sorts';
import { Category, Sort } from '../../types/type';
import Dropdown from '../common/Dropdown/Dropdown';

import * as S from './DropdownContainer.style';

interface DropdownContainerProps {
  category: Category;
  onChangeCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  sort: Sort;
  onChangeSort: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function DropdownContainer({
  category,
  onChangeCategory,
  sort,
  onChangeSort,
}: DropdownContainerProps) {
  const categoryOptions = Object.entries(CATEGORY).map(([key, value]) => [
    key,
    value as string,
  ]);

  const sortOptions = Object.entries(SORT).map(([key, value]) => [
    key,
    value as string,
  ]);

  return (
    <S.Container>
      <Dropdown
        optionList={categoryOptions}
        value={category}
        onChange={onChangeCategory}
        type="category"
      />
      <Dropdown
        optionList={sortOptions}
        value={sort}
        onChange={onChangeSort}
        type="sort"
      />
    </S.Container>
  );
}

export default DropdownContainer;
