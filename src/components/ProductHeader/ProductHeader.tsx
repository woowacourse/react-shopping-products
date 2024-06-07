import { categoryOptions, sortOptions } from "../../constants";
import { DropDown } from "../DropDown/DropDown";
import { StyledDropDownContainer, StyledHeader, StyledTitle } from "./ProductHeader.styled";

const sortOptionsMap: { [key: string]: string } = {
  "낮은 가격순": "price,asc",
  "높은 가격순": "price,desc",
};

interface ProductHeaderProps {
  setSortOption: (sortOption: string) => void;
  setCategory: (category: string) => void;
  resetPage: () => void;
  selectedCategory: string;
  selectedSort: string;
}

export const ProductHeader = ({
  setSortOption,
  setCategory,
  resetPage,
  selectedCategory,
  selectedSort,
}: ProductHeaderProps) => {
  const handleCategory = (value: string) => {
    setCategory(value);
    resetPage();
  };

  const handleSort = (value: string) => {
    setSortOption(sortOptionsMap[value]);
    resetPage();
  };

  return (
    <StyledHeader>
      <StyledTitle>상품 목록</StyledTitle>
      <StyledDropDownContainer>
        <DropDown value={selectedCategory} onChange={handleCategory} options={categoryOptions} />
        <DropDown value={selectedSort} onChange={handleSort} options={sortOptions} />
      </StyledDropDownContainer>
    </StyledHeader>
  );
};
