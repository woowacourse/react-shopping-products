import styled from "styled-components";
import Select from "../common/Select";
import { isCategory, isPriceSort } from "@components/__utils__/typeGuards";
import {
  CATEGORY_SELECT_OPTIONS,
  PRICE_SORT_SELECT_OPTIONS,
} from "@components/__constants__/selectOptions";
import type { Category, PriceSort } from "products";

interface ProductFilterBarProps {
  updateCategoryFilter: (category: Category) => void;
  updatePriceSort: (sort: PriceSort) => void;
}

const ProductFilterBar = ({ updateCategoryFilter, updatePriceSort }: ProductFilterBarProps) => {
  const handleCategoryFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (isCategory(e.target.value)) {
      updateCategoryFilter(e.target.value);
    }
  };

  const handlePriceSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (isPriceSort(e.target.value)) {
      updatePriceSort(e.target.value);
    }
  };

  return (
    <S.SelectContainer>
      <Select onChange={handleCategoryFilterChange} options={CATEGORY_SELECT_OPTIONS} />
      <Select onChange={handlePriceSortChange} options={PRICE_SORT_SELECT_OPTIONS} />
    </S.SelectContainer>
  );
};

export default ProductFilterBar;

const S = {
  SelectContainer: styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
  `,
};
