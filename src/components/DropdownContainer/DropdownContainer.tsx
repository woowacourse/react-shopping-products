import { Category } from "../../interfaces/Product";
import { Sorting } from "../../interfaces/Sorting";
import Dropdown from "../common/Dropdown/Dropdown";
import * as S from "./DropdownContainer.style";

interface DropdownContainerProps {
  category: Category;
  onChangeCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  sortingOption: Sorting;
  onChangeSortingOption: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const categoryOptions = Object.entries(Category).map(([key, value]) => ({
  key: key,
  value: value,
}));

const sortingOptions = Object.entries(Sorting).map(([key, value]) => ({
  key: key,
  value: value,
}));

function DropdownContainer({
  category,
  onChangeCategory,
  sortingOption,
  onChangeSortingOption,
}: DropdownContainerProps) {
  return (
    <S.Container>
      <Dropdown
        optionList={categoryOptions}
        value={category}
        onChange={onChangeCategory}
        type="category"
      />
      <Dropdown
        optionList={sortingOptions}
        value={sortingOption}
        onChange={onChangeSortingOption}
        type="sort"
      />
    </S.Container>
  );
}

export default DropdownContainer;
