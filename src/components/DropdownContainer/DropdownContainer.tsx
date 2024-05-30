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

function DropdownContainer({
  category,
  onChangeCategory,
  sortingOption,
  onChangeSortingOption,
}: DropdownContainerProps) {
  const categoryOptions = [["", "전체"]];
  categoryOptions.push(
    ...Object.entries(Category).map(([key, value]) => [key, `${value}`])
  );

  const sortingOptions = Object.entries(Sorting).map(([key, value]) => [
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
      ></Dropdown>
      <Dropdown
        optionList={sortingOptions}
        value={sortingOption}
        onChange={onChangeSortingOption}
        type="sort"
      ></Dropdown>
    </S.Container>
  );
}

export default DropdownContainer;
