import * as S from "./ProductControl.styled";
import Select from "../common/Select/Select";
import { CategoryOptions, SortOptions } from "../../constants/selectOptions";
import { Dispatch, SetStateAction, ChangeEvent } from "react";

function ProductControl({
  setCategory,

  setSort,
}: {
  setCategory: Dispatch<SetStateAction<string>>;

  setSort: Dispatch<SetStateAction<string>>;
}) {
  async function handleCategoryChange(e: ChangeEvent<HTMLSelectElement>) {
    const newCategory = e.target.value;
    setCategory(newCategory);
  }

  async function handleSortChange(e: ChangeEvent<HTMLSelectElement>) {
    const newSort = e.target.value;
    setSort(newSort);
  }

  return (
    <S.ProductControlContainer>
      <S.ProductControlTitle>bpple 상품목록</S.ProductControlTitle>
      <S.SelectContainer>
        <Select options={CategoryOptions} onChange={handleCategoryChange} />
        <Select options={SortOptions} onChange={handleSortChange} />
      </S.SelectContainer>
    </S.ProductControlContainer>
  );
}

export default ProductControl;
