import { categoryOptions, sortOptions } from "../../constants/options";
import { DropDown } from "../DropDown/DropDown";
import { StyledDropDownContainer, StyledHeader, StyledTitle } from "./ProductHeader.styled";

const sortOptionsMap: { [key: string]: string } = {
  "price,asc": "낮은 가격순",
  "price,desc": "높은 가격순",
};

interface ProductHeaderProps {
  categoryState: {
    currentCategory: string;
    changeCategory: (value: string) => void;
  };

  sortOptionState: {
    currentSortOption: string;
    changeSortOption: (value: string) => void;
  };
}

export const ProductHeader = ({ categoryState, sortOptionState }: ProductHeaderProps) => {
  return (
    <StyledHeader>
      <StyledTitle>상품 목록</StyledTitle>
      <StyledDropDownContainer>
        <DropDown
          value={categoryState.currentCategory}
          onChange={categoryState.changeCategory}
          options={categoryOptions}
        />
        <DropDown
          value={sortOptionsMap[sortOptionState.currentSortOption]}
          onChange={sortOptionState.changeSortOption}
          options={sortOptions}
        />
      </StyledDropDownContainer>
    </StyledHeader>
  );
};
