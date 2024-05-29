import { Category } from "../../interfaces/Product";
import { Sorting } from "../../interfaces/Sorting";
import Dropdown from "../common/Dropdown/Dropdown";
import * as S from "./DropdownContainer.style";

function DropdownContainer() {
  const categoryOptions = [["all", "전체"]];
  categoryOptions.push(
    ...Object.entries(Category).map(([key, value]) => [key, `${value}`])
  );

  const sortingOptions = Object.entries(Sorting).map(([key,value]) => [key,value as string])
  
  return (
    <S.Container>
      <Dropdown optionList={categoryOptions} type="category"></Dropdown>
      <Dropdown optionList={sortingOptions} type="sort"></Dropdown>
    </S.Container>
  );
}

export default DropdownContainer;
