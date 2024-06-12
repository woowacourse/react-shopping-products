import { CATEGORY } from '../../constants/categories';
import { SORT } from '../../constants/sorts';
import { Category, Sort } from '../../types/type';
import Dropdown from '../common/Dropdown/Dropdown';

import * as S from './DropdownContainer.style';

interface DropdownContainerProps {
  onChangeCategory: (value: Category) => void;
  onChangeSort: (value: Sort) => void;
}

function DropdownContainer({
  onChangeCategory,
  onChangeSort,
}: DropdownContainerProps) {
  const categoryOptions: [Category, string][] = Object.entries(CATEGORY).map(
    ([key, value]) => [key as Category, value],
  );

  const sortOptions: [Sort, string][] = Object.entries(SORT).map(
    ([key, value]) => [key as Sort, value],
  );

  return (
    <S.Container>
      <Dropdown optionList={categoryOptions} onChange={onChangeCategory} />
      <Dropdown optionList={sortOptions} onChange={onChangeSort} />
    </S.Container>
  );
}

export default DropdownContainer;
