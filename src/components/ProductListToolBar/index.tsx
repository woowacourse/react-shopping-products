import { css } from "@emotion/css";
import FilterDropDown from "./FilterDropDown";
import SortingDropDown from "./SortingDropDown";

import {
  CATEGORY,
  Category,
  SORT_OPTION,
  SortOption,
} from "../../types/product.type";

interface ProductListToolBarProps {
  category: Category;
  sort: SortOption;
  setCategory: (newCategory: Category) => void;
  setSort: (newSort: SortOption) => void;
}

const ProductListToolBar = ({
  category,
  sort,
  setCategory,
  setSort,
}: ProductListToolBarProps) => {
  const isCategoryOption = (value: string): value is Category =>
    CATEGORY.includes(value);
  const isSortOption = (value: string): value is SortOption =>
    SORT_OPTION.includes(value);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (isCategoryOption(e.target.value)) setCategory(e.target.value);
  };

  const handleSortingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (isSortOption(e.target.value)) setSort(e.target.value);
  };

  return (
    <section className={ToolBarSectionStyles}>
      <h1>bpple 상품 목록</h1>
      <div className={ProductListToolBarStyles}>
        <FilterDropDown
          options={CATEGORY}
          handleChange={handleFilterChange}
          value={category}
        />
        <SortingDropDown
          options={SORT_OPTION}
          handleChange={handleSortingChange}
          value={sort}
        />
      </div>
    </section>
  );
};

export default ProductListToolBar;

const ToolBarSectionStyles = css`
  width: 100%;
  margin-top: 64px;
  padding: 36px 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
  justify-content: center;
`;

const ProductListToolBarStyles = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
