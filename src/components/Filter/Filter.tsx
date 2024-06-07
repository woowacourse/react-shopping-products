import { ChangeEvent, HTMLAttributes } from "react";
import { Wrapper, Select } from "./Filter.style";
import { Category, Sort } from "@/types";

interface FilterProps extends HTMLAttributes<HTMLDivElement> {
  category: Category;
  sort: Sort;
  handleCategoryChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleSortChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const Filter = ({
  category,
  sort,
  handleCategoryChange,
  handleSortChange,
  ...rest
}: FilterProps) => {
  return (
    <Wrapper {...rest}>
      <Select onChange={handleCategoryChange} value={category}>
        <option value="all">전체</option>
        <option value="fashion">패션</option>
        <option value="beverage">음료수</option>
        <option value="electronics">전가기기</option>
        <option value="books">책</option>
        <option value="kitchen">주방</option>
        <option value="fitness">피트니스</option>
      </Select>
      <Select onChange={handleSortChange} value={sort}>
        <option value="price,id,asc">낮은 가격순</option>
        <option value="price,id,desc">높은 가격순</option>
      </Select>
    </Wrapper>
  );
};

export default Filter;
