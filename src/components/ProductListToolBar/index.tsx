import { css } from "@emotion/css";
import FilterDropDown from "./FilterDropDown";
import SortingDropDown from "./SortingDropDown";
import { useProductsContext } from "../../contexts/products/useProductsContext";
import {
  CATEGORY,
  Category,
  SORT_OPTION,
  SortOption,
} from "../../types/product.type";

const ProductListToolBar = () => {
  const { handleChangeSort, handleChangeCategory } = useProductsContext();

  const isCategoryOption = (value: string): value is Category => {
    return CATEGORY.includes(value);
  };

  const isSortOption = (value: string): value is SortOption => {
    return SORT_OPTION.includes(value);
  };

  const handleFilterChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (isCategoryOption(e.target.value)) handleChangeCategory(e.target.value);
  };

  const handleSortingChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (isSortOption(e.target.value)) handleChangeSort(e.target.value);
  };

  return (
    <section className={ToolBarSectionStyles}>
      <h1>bpple 상품 목록</h1>
      <div className={ProductListToolBarStyles}>
        <FilterDropDown options={CATEGORY} handleChange={handleFilterChange} />
        <SortingDropDown
          options={SORT_OPTION}
          handleChange={handleSortingChange}
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
