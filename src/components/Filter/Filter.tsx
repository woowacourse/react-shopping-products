import { ChangeEvent, HTMLAttributes } from "react";
import { Wrapper, Select } from "./Filter.style";
import { Category, Sort } from "@/types";
import { CATEGORIES, SORTS, SORT_KOREANS, CATEGORY_KOREANS } from "@/constants/product";

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
        {CATEGORIES.map((value, index) => (
          <option key={value} value={value}>
            {CATEGORY_KOREANS[index]}
          </option>
        ))}
      </Select>
      <Select onChange={handleSortChange} value={sort}>
        {SORTS.map((value, index) => (
          <option key={value} value={value}>
            {SORT_KOREANS[index]}
          </option>
        ))}
      </Select>
    </Wrapper>
  );
};

export default Filter;
