import { categoryOptions, sortOptions } from "../../constants";
import { DropDown } from "../DropDown/DropDown";
import * as S from "./ProductHeader.styled";

export const sortOptionsMap: Record<string, SortOrder> = {
  "낮은 가격순": "price,asc",
  "높은 가격순": "price,desc",
};

interface ProductHeaderProps {
  setSortOption: (sortOption: SortOrder) => void;
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
    <S.StyledHeader>
      <S.StyledTitle>상품 목록</S.StyledTitle>
      <S.StyledDropDownContainer>
        <DropDown value={selectedCategory} onChange={handleCategory} options={categoryOptions} />
        <DropDown value={selectedSort} onChange={handleSort} options={sortOptions} />
      </S.StyledDropDownContainer>
    </S.StyledHeader>
  );
};
